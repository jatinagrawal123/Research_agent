from pathlib import Path
import sys


PROJECT_ROOT = Path(__file__).resolve().parent.parent


def ensure_project_root_on_path() -> None:
    if str(PROJECT_ROOT) not in sys.path:
        sys.path.insert(0, str(PROJECT_ROOT))
