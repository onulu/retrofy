from fastapi import FastAPI, File, HTTPException, UploadFile, Depends
from fastapi.middleware.cors import CORSMiddleware
from secrets import compare_digest

import os

from dotenv import load_dotenv


from .utils.add_dithering import apply_dithering_effect
from .utils.add_glitch import apply_glitch_effect
from .utils.add_pixelate import apply_pixelate
from .utils.image_processing import process_image
from .utils.add_halftone import apply_halftone_effect, apply_halftone_v2

from .schemas import (
    DitheringParameters,
    GlitchParameters,
    HalftoneParameters,
    PixelateParameters,
    NoiseParameters,
    PasscodeCheck,
)

load_dotenv()

app = FastAPI()

# CORS 설정
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
origins = (
    [
        "https://retrofy.pics",
        "https://retrofy.vercel.app",
    ]
    if ENVIRONMENT == "production"
    else [
        "http://localhost:5173",
        "https://retrofy.pics",
        "https://retrofy.vercel.app",
    ]
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/dithering")
async def apply_dithering(
    file: UploadFile = File(...), params: DitheringParameters = Depends()
):
    try:
        return await process_image(file, apply_dithering_effect, params)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/glitch")
async def glitch_image(
    file: UploadFile = File(...), params: GlitchParameters = Depends()
):
    try:
        return await process_image(file, apply_glitch_effect, params)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/halftone")
async def halftone_image(
    file: UploadFile = File(...), params: HalftoneParameters = Depends()
):
    try:
        return await process_image(file, apply_halftone_effect, params)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/halftone-v2")
async def halftone_v2_image(
    file: UploadFile = File(...), params: HalftoneParameters = Depends()
):
    try:
        return await process_image(file, apply_halftone_v2, params)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/pixelate")
async def pixelate_image(
    file: UploadFile = File(...), params: PixelateParameters = Depends()
):
    try:
        return await process_image(file, apply_pixelate, params)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/noise")
async def add_noise(file: UploadFile = File(...), params: NoiseParameters = Depends()):
    try:
        return await process_image(file, add_noise, params)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/")
async def read_root():
    return {"message": "Welcome to Retrofy API :)"}


@app.get("/health")
async def health_check():
    return {"status": "ok"}


@app.post("/check-passcode")
async def check_passcode(passcode: PasscodeCheck):
    correct_passcode = os.getenv("PASSCODE")

    if correct_passcode is None:
        raise HTTPException(status_code=500, detail="Server configuration error")

    if compare_digest(passcode.passcode, correct_passcode):
        return {"message": "Passcode is correct", "success": True}
    else:
        raise HTTPException(status_code=401, detail="Incorrect passcode")
