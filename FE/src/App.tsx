import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent, KeyboardEvent } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  Link,
  Paper,
  Stack,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from '@mui/material'
// Inline SVG icons — avoids dependency on @mui/icons-material barrel
function AutoAwesomeRoundedIcon(props: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={props.color === 'inherit' ? 'currentColor' : 'currentColor'} style={{ display: 'inline-block', flexShrink: 0 }}>
      <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12zm7.5 4.5l-1.25 2.75L15 18l2.75 1.25L19 22l1.25-2.75L23 18l-2.75-1.25z" />
    </svg>
  )
}
function ExpandMoreRoundedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', flexShrink: 0 }}>
      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </svg>
  )
}
function LaunchRoundedIcon(props: { sx?: { fontSize?: number } }) {
  const size = props.sx?.fontSize ?? 18
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', flexShrink: 0 }}>
      <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2zm-5-16v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3z" />
    </svg>
  )
}
function LibraryBooksRoundedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', flexShrink: 0 }}>
      <path d="M4 6H2v14a2 2 0 0 0 2 2h14v-2H4zm16-4H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-1 9H9V9h10zm-4 4H9v-2h6zm4-8H9V5h10z" />
    </svg>
  )
}
function QueryStatsRoundedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', flexShrink: 0 }}>
      <path d="M19.5 12c0-.23-.01-.45-.03-.68l1.86-1.41c.4-.3.51-.86.26-1.3l-1.87-3.23a.987.987 0 0 0-1.25-.42l-2.15.91c-.37-.26-.76-.49-1.17-.68l-.29-2.31C14.8 2.38 14.37 2 13.87 2h-3.73c-.5 0-.93.38-.99.88l-.29 2.31c-.41.19-.8.42-1.17.68l-2.15-.91c-.46-.2-1-.02-1.25.42L2.41 8.62c-.25.44-.14.99.26 1.3l1.86 1.41a7.343 7.343 0 0 0 0 1.35l-1.86 1.41c-.4.3-.51.86-.26 1.3l1.87 3.23c.25.44.79.62 1.25.42l2.15-.91c.37.26.76.49 1.17.68l.29 2.31c.06.5.49.88.99.88h3.73c.5 0 .93-.38.99-.88l.29-2.31c.41-.19.8-.42 1.17-.68l2.15.91c.46.2 1 .02 1.25-.42l1.87-3.23c.25-.44.14-.99-.26-1.3l-1.86-1.41c.03-.23.04-.45.04-.68zm-7.46 3.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
    </svg>
  )
}
function TravelExploreRoundedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', flexShrink: 0 }}>
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  )
}
function DownloadRoundedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', flexShrink: 0 }}>
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 7h14v2H5z" />
    </svg>
  )
}
function ContentCopyRoundedIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', flexShrink: 0 }}>
      <path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z" />
    </svg>
  )
}
function CheckRoundedIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', flexShrink: 0 }}>
      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  )
}
function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', flexShrink: 0 }}>
      <path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-5a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 17a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zM4.22 4.22a1 1 0 0 1 1.42 0l.7.71a1 1 0 1 1-1.41 1.41l-.71-.7a1 1 0 0 1 0-1.42zm13.14 13.14a1 1 0 0 1 1.42 0l.7.71a1 1 0 0 1-1.41 1.41l-.71-.71a1 1 0 0 1 0-1.41zM3 12a1 1 0 0 1 1-1h1a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1zm16 0a1 1 0 0 1 1-1h1a1 1 0 0 1 0 2h-1a1 1 0 0 1-1-1zM4.22 19.78a1 1 0 0 1 0-1.42l.71-.7a1 1 0 1 1 1.41 1.41l-.7.71a1 1 0 0 1-1.42 0zm13.14-13.14a1 1 0 0 1 0-1.42l.71-.7a1 1 0 1 1 1.41 1.41l-.7.71a1 1 0 0 1-1.42 0z" />
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', flexShrink: 0 }}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { runResearch } from './api'
import type { ResearchResponse } from './types'
import { createAppTheme } from './theme'
import './App.css'

const LOADING_STEPS = [
  'Searching the web for sources',
  'Analysing and summarising content',
  'Writing your research report',
]

function AnimatedCounter({ value }: { value: number }) {
  const motionVal = useMotionValue(0)
  const rounded = useTransform(motionVal, (v) => Math.round(v).toLocaleString())
  useEffect(() => {
    const ctrl = animate(motionVal, value, { duration: 1.6, ease: 'easeOut' })
    return ctrl.stop
  }, [value, motionVal])
  return <motion.span>{rounded}</motion.span>
}

const sampleQuery =
  'The future of multimodal AI agents in enterprise research, operations, and decision support'

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
}

function parseBold(text: string): React.ReactNode[] {
  return text.split(/\*\*([^*]+)\*\*/).map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
  )
}

function renderReportContent(text: string) {
  const blocks = text.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean)
  return blocks.map((block, blockIndex) => {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean)
    const first = lines[0]
    // Section heading: "## Title", "# Title", or "1. Title" / "**Title**" alone
    const isHeading =
      /^#{1,3}\s/.test(first) ||
      /^\d+\.\s+[A-Z]/.test(first) ||
      (lines.length === 1 && /^\*\*[^*]+\*\*$/.test(first))
    // Bullet / numbered list
    const isList = lines.length > 1 && lines.every((l) => /^[-•*]\s|^\d+\.\s/.test(l))

    if (isHeading && lines.length === 1) {
      const heading = first
        .replace(/^#{1,3}\s+/, '')
        .replace(/^\d+\.\s+/, '')
        .replace(/\*\*/g, '')
      return (
        <Typography
          key={blockIndex}
          variant="h5"
          sx={{ mt: blockIndex > 0 ? 3.5 : 0.5, mb: 1.25, fontWeight: 700, color: 'primary.dark' }}
        >
          {heading}
        </Typography>
      )
    }
    if (isList) {
      return (
        <Box key={blockIndex} component="ul" sx={{ pl: 2.5, mt: 0.5, mb: 1.5, listStyleType: 'disc' }}>
          {lines.map((line, lineIndex) => (
            <Typography
              key={lineIndex}
              component="li"
              variant="body1"
              sx={{ mb: 0.6, pl: 0.5 }}
            >
              {parseBold(line.replace(/^[-•*]\s+/, '').replace(/^\d+\.\s+/, ''))}
            </Typography>
          ))}
        </Box>
      )
    }
    return (
      <Typography key={blockIndex} paragraph variant="body1" sx={{ mb: 1.25 }}>
        {lines.map((line) => parseBold(line)).reduce<React.ReactNode[]>(
          (acc, node, i) => (i === 0 ? [node] : [...acc, ' ', node]),
          [],
        )}
      </Typography>
    )
  })
}

function App() {
  const [query, setQuery] = useState(sampleQuery)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ResearchResponse | null>(null)
  const [copied, setCopied] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [mode, setMode] = useState<'light' | 'dark'>('dark')
  const formRef = useRef<HTMLFormElement>(null)
  const reportRef = useRef<HTMLDivElement>(null)

  const theme = useMemo(() => createAppTheme(mode), [mode])

  useEffect(() => {
    document.body.dataset.mode = mode
  }, [mode])

  useEffect(() => {
    if (!isLoading) { setLoadingStep(0); return }
    const id = setInterval(() => setLoadingStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1)), 8000)
    return () => clearInterval(id)
  }, [isLoading])

  const metrics = useMemo(() => {
    if (!result) {
      return {
        tasks: 0,
        sources: 0,
        words: 0,
      }
    }

    return {
      tasks: result.research_tasks.length,
      sources: result.worker_results.reduce(
        (total, workerResult) => total + workerResult.research.length,
        0,
      ),
      words: result.final_report.split(/\s+/).filter(Boolean).length,
    }
  }, [result])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      setError('Enter a research question to generate a report.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const researchResult = await runResearch(trimmedQuery)
      setResult(researchResult)
      setTimeout(() => reportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'The research run could not be completed.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      formRef.current?.requestSubmit()
    }
  }

  function downloadReport() {
    if (!result) return
    const blob = new Blob([result.final_report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${result.query.slice(0, 60).replace(/[^a-z0-9]/gi, '_')}_report.txt`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  async function copyReport() {
    if (!result) return
    await navigator.clipboard.writeText(result.final_report)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Box className="app-shell">
      <Box className="app-orbit app-orbit-left" />
      <Box className="app-orbit app-orbit-right" />

      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants}>
            <Paper className="hero-panel" sx={{ p: { xs: 3, md: 5 } }}>
              <Stack spacing={3}>
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', md: 'center' }}
                  spacing={2}
                >
                  <Chip
                    color="secondary"
                    icon={<LibraryBooksRoundedIcon />}
                    label="AI Research Agent"
                  />
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      color={isLoading ? 'secondary' : result ? 'primary' : 'default'}
                      icon={isLoading ? <CircularProgress size={16} color="inherit" /> : <AutoAwesomeRoundedIcon />}
                      label={isLoading ? 'Generating your report…' : result ? 'Report ready' : 'Ready'}
                      variant={result || isLoading ? 'filled' : 'outlined'}
                    />
                    <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
                      <IconButton
                        onClick={() => setMode((m) => m === 'dark' ? 'light' : 'dark')}
                        size="small"
                        sx={{
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 99,
                          width: 36,
                          height: 36,
                          color: 'text.secondary',
                          '&:hover': { color: 'primary.main', borderColor: 'primary.main' },
                          transition: 'color 0.2s, border-color 0.2s',
                        }}
                      >
                        {mode === 'dark' ? <SunIcon /> : <MoonIcon />}
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>

                <Box className="hero-grid">
                  <Stack spacing={2.5} sx={{ maxWidth: 760 }}>
                    <Typography variant="h1" className="hero-gradient-text">
                      Ask anything. Get a complete research report.
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Type your topic or question below. The AI will search the web,
                      gather information from multiple sources, and write you a detailed,
                      structured report — ready to read in minutes.
                    </Typography>
                  </Stack>

                  <Box className="hero-stats-wrap">
                    <Paper className="metric-card" sx={{ p: 2.5 }}>
                      <Typography variant="overline" className="metric-label">
                        report length
                      </Typography>
                      <Typography variant="h3"><AnimatedCounter value={metrics.words} /></Typography>
                      <Typography color="text.secondary">words in your report</Typography>
                    </Paper>
                    <Paper className="metric-card" sx={{ p: 2.5 }}>
                      <Typography variant="overline" className="metric-label">
                        sources found
                      </Typography>
                      <Typography variant="h3"><AnimatedCounter value={metrics.sources} /></Typography>
                      <Typography color="text.secondary">web pages read and summarized</Typography>
                    </Paper>
                    <Paper className="metric-card" sx={{ p: 2.5 }}>
                      <Typography variant="overline" className="metric-label">
                        topics covered
                      </Typography>
                      <Typography variant="h3"><AnimatedCounter value={metrics.tasks} /></Typography>
                      <Typography color="text.secondary">subtopics investigated</Typography>
                    </Paper>
                  </Box>
                </Box>

                <Paper className="query-panel" sx={{ p: { xs: 2, md: 3 } }}>
                  <Box component="form" ref={formRef} onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                      <TextField
                        label="What do you want to research?"
                        placeholder="e.g. The impact of artificial intelligence on healthcare, Climate change solutions in 2025, The history of quantum computing…"
                        multiline
                        minRows={4}
                        fullWidth
                        value={query}
                        onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setQuery(event.target.value)}
                        onKeyDown={handleKeyDown}
                        helperText={`${query.length} characters · Press Enter to generate · Shift+Enter for new line`}
                      />

                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={1.5}
                        justifyContent="space-between"
                        alignItems={{ xs: 'stretch', sm: 'center' }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Searches the web · reads multiple sources · writes a full report
                        </Typography>

                        <Button
                          type="submit"
                          size="large"
                          variant="contained"
                          disableElevation
                          startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : <TravelExploreRoundedIcon />}
                          disabled={isLoading}
                          sx={{ minWidth: 180 }}
                        >
                          {isLoading ? 'Researching…' : 'Generate Report'}
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </Paper>

                {error ? <Alert severity="error">{error}</Alert> : null}

                {isLoading ? (
                  <Box className="loading-steps" sx={{ px: 1 }}>
                    {LOADING_STEPS.map((step, i) => (
                      <Box
                        key={step}
                        className={`loading-step${i === loadingStep ? ' active' : i < loadingStep ? ' done' : ''}`}
                      >
                        <Box className="step-dot" />
                        <Typography variant="body2">{step}</Typography>
                      </Box>
                    ))}
                  </Box>
                ) : null}
              </Stack>
            </Paper>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Box className="content-grid">
              <Paper className="surface-card" sx={{ p: { xs: 2.5, md: 3.5 } }}>
                <Stack spacing={2.5}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <QueryStatsRoundedIcon />
                    <Typography variant="h4">Topics Covered</Typography>
                  </Stack>
                  <Typography color="text.secondary">
                    These are the specific angles the AI researched to build your report.
                  </Typography>
                  <Divider />

                  {result ? (
                    <Stack spacing={1.5}>
                      {result.research_tasks.map((task, index) => (
                        <Paper key={task} variant="outlined" className="task-card" sx={{ p: 2 }}>
                          <Typography className="task-index">topic {index + 1}</Typography>
                          <Typography variant="body1">{task}</Typography>
                        </Paper>
                      ))}
                    </Stack>
                  ) : (
                    <Typography color="text.secondary">
                      Enter your topic above and click Generate Report to get started.
                    </Typography>
                  )}
                </Stack>
              </Paper>

              <Paper className="surface-card report-card" sx={{ p: { xs: 2.5, md: 4 } }}>
                <Stack spacing={2.5}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={1.5}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                  >
                    <Box ref={reportRef}>
                      <Typography variant="h4">Research Report</Typography>
                      <Typography color="text.secondary">
                        A full written report based on live web research for your topic.
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                      {result ? <Chip color="primary" label={result.query} sx={{ maxWidth: 240 }} /> : null}
                      {result ? (
                        <>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={copied ? <CheckRoundedIcon /> : <ContentCopyRoundedIcon />}
                            onClick={copyReport}
                            color={copied ? 'success' : 'primary'}
                          >
                            {copied ? 'Copied!' : 'Copy'}
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            disableElevation
                            startIcon={<DownloadRoundedIcon />}
                            onClick={downloadReport}
                          >
                            Download
                          </Button>
                        </>
                      ) : null}
                    </Stack>
                  </Stack>

                  <Divider />

                  {result ? (
                    <Box className="report-body">
                      {renderReportContent(result.final_report)}
                    </Box>
                  ) : (
                    <Box className="report-empty">
                      <Typography variant="h3">Your report will appear here</Typography>
                      <Typography color="text.secondary">
                        Enter your topic above and click Generate Report (or press Enter).
                        The AI will search the web and write a structured report for you.
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Paper>
            </Box>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Paper className="surface-card" sx={{ p: { xs: 2.5, md: 3.5 } }}>
              <Stack spacing={2.5}>
                <Typography variant="h4">Sources & References</Typography>
                <Typography color="text.secondary">
                  These are the web pages the AI read and summarized for each topic.
                  Click any link to read the original article.
                </Typography>

                {result ? (
                  <Stack spacing={1.5}>
                    {result.worker_results.map((workerResult, index) => (
                      <Accordion key={workerResult.subtopic} disableGutters elevation={0} className="evidence-accordion">
                        <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                          <Stack spacing={0.5}>
                            <Typography className="task-index">topic {index + 1}</Typography>
                            <Typography variant="h6">{workerResult.subtopic}</Typography>
                          </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Stack spacing={2}>
                            {workerResult.research.length ? (
                              workerResult.research.map((source, sourceIndex) => (
                                <Paper key={`${source.url}-${sourceIndex}`} variant="outlined" sx={{ p: 2.25 }}>
                                  <Stack spacing={1.25}>
                                    <Typography variant="h6">
                                      {source.title ?? `Source ${sourceIndex + 1}`}
                                    </Typography>
                                    <Typography className="source-summary">
                                      {source.summary}
                                    </Typography>
                                    <Link
                                      href={source.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      underline="hover"
                                      sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}
                                    >
                                      Read full article
                                      <LaunchRoundedIcon sx={{ fontSize: 18 }} />
                                    </Link>
                                  </Stack>
                                </Paper>
                              ))
                            ) : (
                              <Typography color="text.secondary">
                                No source summaries were captured for this subtopic.
                              </Typography>
                            )}
                          </Stack>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Stack>
                ) : (
                  <Typography color="text.secondary">
                      Your sources will appear here after you generate a report.
                    </Typography>
                )}
              </Stack>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
    </ThemeProvider>
  )
}

export default App
