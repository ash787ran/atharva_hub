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

# Absolute Core Path Resolution
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def locate_directory(dir_name):
    """Surgically traces directories across deep repository branches on Linux/Render configurations."""
    options = [
        os.path.join(BASE_DIR, dir_name),
        os.path.join(BASE_DIR, dir_name.lower()),
        os.path.join(BASE_DIR, "atharva_hub", dir_name),
        os.path.join(BASE_DIR, "atharva_hub", dir_name.lower()),
        os.path.join(os.path.dirname(BASE_DIR), dir_name),  # Step up one level if trapped in root
        os.path.join(os.path.dirname(BASE_DIR), "atharva_hub", dir_name),
    ]
    
    for path in options:
        if os.path.exists(path) and os.path.isdir(path):
            logger.info(f"🎨 ASSET ALIGNMENT: Mapped '{dir_name}' to verified path: {path}")
            # Log any files found inside for deep diagnosis
            files = os.listdir(path)
            logger.info(f"📂 Contents found inside '{dir_name}': {files[:5]} (Total: {len(files)} files)")
            return path
            
    # Absolute Fallback if missing anywhere (creates it to prevent crashes)
    fallback = os.path.join(BASE_DIR, dir_name.lower())
    os.makedirs(fallback, exist_ok=True)
    logger.warning(f"⚠️ PATH MISSMATCH: '{dir_name}' not found. Fallback created at: {fallback}")
    return fallback

STATIC_DIR = locate_directory("static")
TEMPLATES_DIR = locate_directory("templates")
IMAGES_DIR = locate_directory("images")

# Mount asset frameworks with global scoping aliases
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
    """Serve the central high-fidelity layout framework."""
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
