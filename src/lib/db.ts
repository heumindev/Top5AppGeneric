import { Pool } from 'pg'

// Create a connection pool to your Digital Ocean PostgreSQL database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Digital Ocean managed databases
  },
})

export async function query(text: string, params?: unknown[]) {
  const client = await pool.connect()
  try {
    const result = await client.query(text, params)
    return result
  } finally {
    client.release()
  }
}

// Initialize the newsletter_subscribers table if it doesn't exist
export async function initializeDatabase() {
  // Create table with site tracking
  await query(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      site_domain VARCHAR(255) NOT NULL,
      site_name VARCHAR(255),
      subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(50) DEFAULT 'active',
      ip_address VARCHAR(45),
      user_agent TEXT,
      UNIQUE(email, site_domain)
    )
  `)

  // Create index for faster queries by site
  await query(`
    CREATE INDEX IF NOT EXISTS idx_newsletter_site_domain
    ON newsletter_subscribers(site_domain)
  `)
}

export default pool
