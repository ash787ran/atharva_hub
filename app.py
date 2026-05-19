# app.py
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("QuantumArcadeEngine")

app = FastAPI(
    title="Atharva Quantum Arcade Core Engine",
    version="10.0.0"
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# SMART PATH SEARCH: Finds the directory regardless of case or folder nesting levels
def locate_directory(dir_name):
    options = [
        os.path.join(BASE_DIR, dir_name),
        os.path.join(BASE_DIR, dir_name.lower()),
        os.path.join(BASE_DIR, dir_name.capitalize()),
        os.path.join(BASE_DIR, "atharva_hub", dir_name),
        os.path.join(BASE_DIR, "atharva_hub", dir_name.lower()),
    ]
    for path in options:
        if os.path.exists(path) and os.path.isdir(path):
            logger.info(f"Successfully mapped {dir_name} to valid path: {path}")
            return path
            
    # Fallback if not found anywhere
    default_path = os.path.join(BASE_DIR, dir_name.lower())
    os.makedirs(default_path, exist_ok=True)
    return default_path

STATIC_DIR = locate_directory("static")
TEMPLATES_DIR = locate_directory("templates")
IMAGES_DIR = locate_directory("images")

# Mount asset frameworks with strict explicit logging diagnostics
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
app.mount("/images", StaticFiles(directory=IMAGES_DIR), name="images")

templates = Jinja2Templates(directory=[TEMPLATES_DIR])

class TelemetryPayload(BaseModel):
    pilot_name: str
    current_score: int
    streak_multiplier: int
    unlocked_rank: str
    active_module: str

@app.get("/", response_class=HTMLResponse)
async def load_master_console_viewport(request: Request):
    """Serve the central graphics layout framework safely."""
    try:
        return templates.TemplateResponse(request, "index.html")
    except Exception as e:
        logger.critical(f"Fatal template synchronization breach: {str(e)}")
        return JSONResponse(
            status_code=500, 
            content={"error": "Console pipeline alignment error.", "diagnostics_msg": str(e)}
        )

@app.post("/api/telemetry/sync")
async def synchronize_game_telemetry(payload: TelemetryPayload):
    return JSONResponse(status_code=200, content={"status": "synchronized"})
