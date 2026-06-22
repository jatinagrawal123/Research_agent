# Deep Research Agent

AI-powered deep research system with:
- Python backend orchestration (planner, worker, evaluator, writer)
- FastAPI API for report generation
- React + Vite frontend with modern report UI

## Project Structure

- `agents/` - Planner, worker, evaluator, writer agents
- `app/` - API app and bootstrap
- `graph/` - LangGraph state and workflow
- `Orchestrator/` - Research orchestration logic
- `prompts/` - Prompt templates
- `services/` - LLM service wrappers
- `tools/` - Web search, scraping, chunking utilities
- `utils/` - Async helpers
- `frontend/` - React frontend

## Requirements

- Python 3.10+
- Node.js 18+
- npm

## Environment Variables

Create a `.env` file in the project root with:

```env
GROQ_API_KEY=your_groq_api_key
MODEL_NAME=your_model_name
SERPER_API_KEY=your_serper_api_key
```

## Backend Setup

From project root:

```bash
python -m pip install -r requirements.txt
```

Start FastAPI server:

```bash
uvicorn app.api:app --reload --host 127.0.0.1 --port 8000
```

Health check:

- GET http://127.0.0.1:8000/api/health

## Frontend Setup

From `frontend` folder:

```bash
npm install
npm run dev
```

Frontend runs on Vite default port (typically http://127.0.0.1:5173).

Note: `frontend/vite.config.ts` proxies `/api` calls to `http://127.0.0.1:8000`.

## API Usage

### POST `/api/research`

Request body:

```json
{
  "query": "Impact of multimodal AI agents in enterprise workflows"
}
```

Response shape:

```json
{
  "query": "...",
  "research_tasks": ["..."],
  "worker_results": [
    {
      "subtopic": "...",
      "research": [
        {
          "title": "...",
          "summary": "...",
          "url": "..."
        }
      ]
    }
  ],
  "final_report": "..."
}
```

## Optional CLI Run

You can run a direct graph flow from terminal:

```bash
python app/main.py
```

## Build Frontend

```bash
cd frontend
npm run build
npm run preview
```

## Packaging / Zip Guidance

If sharing as zip, exclude generated and sensitive files:

- `.venv/`, `venv/`
- `.env`, `.env.*`
- `frontend/node_modules/`
- `frontend/dist/`, `frontend/.vite/`
- `.git/`
- `.dbclient/`
- `__pycache__/`, `*.pyc`, `.pytest_cache/`, `.mypy_cache/`
- `*.log`, `logs/`, `tmp/`, `temp/`

## Troubleshooting

- 500 on `/api/research`: verify env keys and model value in `.env`
- Frontend cannot call API: confirm backend is running on port 8000
- Rate limit errors: retry after a short wait (backend includes retry logic)
