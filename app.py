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

# Operational Absolute Path Validations
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# SMART PATH DETECTOR: Checks if directories are sitting next to app.py or nested inside a subfolder
def locate_directory(dir_name):
    primary_path = os.path.join(BASE_DIR, dir_name)
    nested_path = os.path.join(BASE_DIR, "atharva_hub", dir_name)
    
    if os.path.exists(primary_path):
        return primary_path
    elif os.path.exists(nested_path):
        return nested_path
    else:
        os.makedirs(primary_path)
        return primary_path

STATIC_DIR = locate_directory("static")
TEMPLATES_DIR = locate_directory("templates")
IMAGES_DIR = locate_directory("images")

logger.info(f"Targeting template framework path: {TEMPLATES_DIR}")
logger.info(f"Targeting static script asset path: {STATIC_DIR}")

# Mount static asset arrays safely
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
app.mount("/images", StaticFiles(directory=IMAGES_DIR), name="images")

# Safely initialized with a list sequence wrapper
templates = Jinja2Templates(directory=[TEMPLATES_DIR])

class TelemetryPayload(BaseModel):
    pilot_name: str
    current_score: int
    streak_multiplier: int
    unlocked_rank: str
    active_module: str

@app.get("/", response_class=HTMLResponse)
async def load_master_console_viewport(request: Request):
    """Serve the central high-fidelity fullscreen graphics layout framework."""
    try:
        # Verify index.html exists inside the resolved templates folder structure
        target_file = os.path.join(TEMPLATES_DIR, "index.html")
        if not os.path.exists(target_file):
            logger.error(f"Missing file error: index.html not found in {TEMPLATES_DIR}")
            raise FileNotFoundError()
            
        # FIX: Passing 'request' directly as the first positional parameter fixes the new signature requirement
        return templates.TemplateResponse(request, "index.html")
    except Exception as e:
        logger.critical(f"Fatal template synchronization breach: {str(e)}")
        return JSONResponse(
            status_code=500, 
            content={
                "error": "Console pipeline alignment error.",
                "resolved_templates_directory": TEMPLATES_DIR,
                "diagnostics_msg": str(e)
            }
        )

@app.post("/api/telemetry/sync")
async def synchronize_game_telemetry(payload: TelemetryPayload):
    logger.info(f"💾 [Telemetry Sync] Pilot: {payload.pilot_name} | Stars: {payload.current_score}")
    return JSONResponse(status_code=200, content={"status": "synchronized", "response_code": "0x4F2A"})
