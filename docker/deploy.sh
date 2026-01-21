#!/bin/bash

# Top 5 Recipes - Deployment Script
# Usage: ./deploy.sh [initial|update|ssl]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env file exists
check_env() {
    if [ ! -f "$SCRIPT_DIR/.env" ]; then
        log_error ".env file not found. Copy .env.example to .env and configure it."
        exit 1
    fi
}

# Initial deployment
initial_deploy() {
    log_info "Starting initial deployment..."
    check_env

    # Load environment variables
    source "$SCRIPT_DIR/.env"

    # Create necessary directories
    mkdir -p "$SCRIPT_DIR/certbot/conf"
    mkdir -p "$SCRIPT_DIR/certbot/www"

    # Start Next.js application
    log_info "Starting application..."
    docker compose -f "$SCRIPT_DIR/docker-compose.yml" up -d nextjs

    # Wait for services to be ready
    log_info "Waiting for services to start..."
    sleep 15

    log_info "Initial deployment complete!"
    log_info "Next steps:"
    log_info "1. Run './deploy.sh ssl' to set up SSL certificates"
    log_info "2. Run './deploy.sh update' to start nginx with SSL"
}

# Setup SSL certificates
setup_ssl() {
    log_info "Setting up SSL certificates..."
    check_env
    source "$SCRIPT_DIR/.env"

    # Start nginx temporarily for ACME challenge
    log_info "Starting temporary nginx for ACME challenge..."

    # Create a temporary nginx config for certificate generation
    cat > "$SCRIPT_DIR/nginx/temp.conf" << 'EOF'
events { worker_connections 1024; }
http {
    server {
        listen 80;
        server_name _;
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }
        location / {
            return 200 "OK";
        }
    }
}
EOF

    docker run -d --name temp-nginx \
        -p 80:80 \
        -v "$SCRIPT_DIR/nginx/temp.conf:/etc/nginx/nginx.conf:ro" \
        -v "$SCRIPT_DIR/certbot/www:/var/www/certbot:ro" \
        nginx:alpine

    # Request certificates for all domains
    IFS=',' read -ra DOMAIN_ARRAY <<< "$DOMAINS"

    DOMAIN_ARGS=""
    for domain in "${DOMAIN_ARRAY[@]}"; do
        DOMAIN_ARGS="$DOMAIN_ARGS -d $domain -d www.$domain"
    done

    log_info "Requesting SSL certificates for: $DOMAINS"
    docker run --rm \
        -v "$SCRIPT_DIR/certbot/conf:/etc/letsencrypt" \
        -v "$SCRIPT_DIR/certbot/www:/var/www/certbot" \
        certbot/certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        --email "$EMAIL" \
        --agree-tos \
        --no-eff-email \
        $DOMAIN_ARGS

    # Clean up temporary nginx
    docker stop temp-nginx && docker rm temp-nginx
    rm "$SCRIPT_DIR/nginx/temp.conf"

    log_info "SSL certificates created successfully!"
}

# Update deployment
update_deploy() {
    log_info "Updating deployment..."
    check_env

    # Pull latest changes if in git repo
    if [ -d "$PROJECT_DIR/.git" ]; then
        log_info "Pulling latest changes..."
        cd "$PROJECT_DIR"
        git pull origin main || log_warn "Could not pull latest changes"
    fi

    # Rebuild and restart services
    log_info "Rebuilding and restarting services..."
    docker compose -f "$SCRIPT_DIR/docker-compose.yml" build nextjs
    docker compose -f "$SCRIPT_DIR/docker-compose.yml" up -d

    # Clean up old images
    log_info "Cleaning up old images..."
    docker image prune -f

    log_info "Update complete!"
}

# Show logs
show_logs() {
    docker compose -f "$SCRIPT_DIR/docker-compose.yml" logs -f "${1:-}"
}

# Main command handler
case "${1:-help}" in
    initial)
        initial_deploy
        ;;
    ssl)
        setup_ssl
        ;;
    update)
        update_deploy
        ;;
    logs)
        show_logs "$2"
        ;;
    stop)
        docker compose -f "$SCRIPT_DIR/docker-compose.yml" down
        ;;
    restart)
        docker compose -f "$SCRIPT_DIR/docker-compose.yml" restart
        ;;
    *)
        echo "Top 5 Recipes - Deployment Script"
        echo ""
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  initial   - Initial deployment (first time setup)"
        echo "  ssl       - Setup SSL certificates"
        echo "  update    - Update and restart services"
        echo "  logs      - Show logs (optionally specify service)"
        echo "  stop      - Stop all services"
        echo "  restart   - Restart all services"
        ;;
esac
