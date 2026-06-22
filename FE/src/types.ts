export type SourceSummary = {
  title: string | null
  summary: string
  url: string
}

export type WorkerResult = {
  subtopic: string
  research: SourceSummary[]
}

export type ResearchResponse = {
  query: string
  research_tasks: string[]
  worker_results: WorkerResult[]
  final_report: string
}
