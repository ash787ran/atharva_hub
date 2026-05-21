# app.py
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import os
import httpx
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("QuantumArcadeEngine")

app = FastAPI(
    title="Atharva Quantum Arcade Core Engine",
    version="11.0.0"
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def locate_directory(dir_name):
    options = [
        os.path.join(BASE_DIR, dir_name),
        os.path.join(BASE_DIR, dir_name.lower()),
        os.path.join(BASE_DIR, "atharva_hub", dir_name),
        os.path.join(BASE_DIR, "atharva_hub", dir_name.lower()),
        os.path.join(os.path.dirname(BASE_DIR), dir_name),
        os.path.join(os.path.dirname(BASE_DIR), "atharva_hub", dir_name),
    ]
    for path in options:
        if os.path.exists(path) and os.path.isdir(path):
            return path
    fallback = os.path.join(BASE_DIR, dir_name.lower())
    os.makedirs(fallback, exist_ok=True)
    return fallback

STATIC_DIR = locate_directory("static")
TEMPLATES_DIR = locate_directory("templates")
IMAGES_DIR = locate_directory("images")

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
app.mount("/images", StaticFiles(directory=IMAGES_DIR), name="images")

templates = Jinja2Templates(directory=[TEMPLATES_DIR])

class TelemetryPayload(BaseModel):
    pilot_name: str
    current_score: int
    streak_multiplier: int
    unlocked_rank: str
    active_module: str

class ChatPayload(BaseModel):
    message: str

@app.get("/", response_class=HTMLResponse)
async def load_master_console_viewport(request: Request):
    return templates.TemplateResponse(request, "index.html")

# NEW ENTERPRISE PIPELINE: LIGHTWEIGHT CHILD-SAFE GEMINI API EDGE ROUTER
@app.post("/api/chat")
async def execute_copilot_inference(payload: ChatPayload):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        # Fallback friendly system if no key is configured on Render yet
        return {"response": "Greetings Captain Atharva! To fully activate my core verbal intelligence systems, please link my Gemini API neural node in the cloud terminal dashboard!"}

    # Strict protective instructions to craft the perfect companion persona for a 6-year-old
    system_instruction = (
        "You are 'COSMIC COMMANDER', a brilliant, friendly, and enthusiastic AI space pilot sitting inside the cockpit of Captain Atharva's starship. "
        "Atharva is a smart 6-year-old boy who loves soccer, science, cricket, and space exploration. "
        "Keep your answers short (2-4 sentences max), highly encouraging, exciting, and extremely easy to understand for a child. "
        "Never use complex technical jargon. Always end your messages with a fun space emoji or cheer him on for his missions!"
    )

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    
    headers = {"Content-Type": "application/json"}
    
    # Correct Gemini API schema format payload
    data = {
        "contents": [{"parts": [{"text": payload.message}]}],
        "systemInstruction": {"parts": [{"text": system_instruction}]},
        "generationConfig": {"maxOutputTokens": 150, "temperature": 0.7}
    }

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(url, json=data, headers=headers)
            if response.status_code != 200:
                logger.error(f"Gemini API failure: {response.text}")
                return {"response": "Bleep bloop! My long-range subspace antenna hit a small space distortion. Try asking me again, Captain! 🛰️"}
            
            result = response.json()
            ai_text = result['candidates'][0]['content']['parts'][0]['text']
            return {"response": ai_text}
            
    except Exception as e:
        logger.error(f"Chat pipeline error: {str(e)}")
        return {"response": "Subspace comms are a bit static-y near this planet. Let's try syncing again! ⚡"}

@app.post("/api/telemetry/sync")
async def synchronize_game_telemetry(payload: TelemetryPayload):
    return JSONResponse(status_code=200, content={"status": "synchronized"})
