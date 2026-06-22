import type { ResearchResponse } from './types'

export async function runResearch(query: string): Promise<ResearchResponse> {
  const response = await fetch('/api/research', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as
      | { detail?: string }
      | null

    if (response.status === 429) {
      throw new Error(
        errorBody?.detail ??
          'The AI service is busy. Please wait a moment and try again.'
      )
    }

    throw new Error(
      errorBody?.detail ?? 'Something went wrong generating the report. Please try again.'
    )
  }

  return (await response.json()) as ResearchResponse
}
