'use client'

interface SaveAsPdfButtonProps {
  recipeTitle: string
}

export function SaveAsPdfButton({ recipeTitle }: SaveAsPdfButtonProps) {
  const handleSavePdf = () => {
    // Set a temporary document title for the PDF filename
    const originalTitle = document.title
    document.title = recipeTitle

    // Trigger print dialog - user can select "Save as PDF"
    window.print()

    // Restore original title
    document.title = originalTitle
  }

  return (
    <button
      onClick={handleSavePdf}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
      aria-label="Save recipe as PDF"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Save PDF
    </button>
  )
}
