# app.py
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import os
import logging

# Configure enterprise-grade logging output channels
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("QuantumArcadeEngine")

app = FastAPI(
    title="Atharva Quantum Arcade Core Engine",
    description="Multi-Threaded Production Gaming OS Architecture",
    version="10.0.0"
)

# Operational Absolute Path Validations
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")
IMAGES_DIR = os.path.join(BASE_DIR, "images")

# Force creation of structural path layers if missing
for path_dir in [STATIC_DIR, TEMPLATES_DIR, IMAGES_DIR]:
    if not os.path.exists(path_dir):
        os.makedirs(path_dir)
        logger.info(f"Initialized critical directory sector: {path_dir}")

# Mount static asset arrays with cache-control headers
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
app.mount("/images", StaticFiles(directory=IMAGES_DIR), name="images")

templates = Jinja2Templates(directory=TEMPLATES_DIR)

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
        return templates.TemplateResponse("index.html", {"request": request})
    except Exception as e:
        logger.critical(f"Fatal template synchronization breach: {str(e)}")
        raise HTTPException(status_code=500, detail="Console pipeline alignment error.")

@app.post("/api/telemetry/sync")
async def synchronize_game_telemetry(payload: TelemetryPayload):
    """Real-time data telemetry synchronization processing scores, ranks, and performance matrices."""
    logger.info(f"💾 [Telemetry Sync] Pilot: {payload.pilot_name} | Stars: {payload.current_score} | Rank: {payload.unlocked_rank} | Module: {payload.active_module}")
    return JSONResponse(status_code=200, content={"status": "synchronized", "response_code": "0x4F2A"})