from pydantic import BaseModel

from fastapi import FastAPI, File, UploadFile, Depends
from fastapi.responses import Response, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

import cv2
import numpy as np

from .dithering import apply_floyd_steinberg_dithering, apply_bayer_dithering
from .add_glitch import add_glitch

from typing import Union

app = FastAPI()

origins = ["http://localhost", "http://localhost:5173"]

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # React 앱의 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class DitheringParameters(BaseModel):
    type: str
    color_mode: str
    grayscale_level: Optional[int] = None
    palette_name: Optional[str] = None
    matrix_size: Optional[int] = None


@app.post("/dithering")
async def apply_dithering(
    file: UploadFile = File(...), params: DitheringParameters = Depends()
):
    image = np.fromstring(await file.read(), np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)

    if image is None:
        return JSONResponse(content={"error": "Invalid image format"}, status_code=400)

    processed_image = image.copy()

    type = params.type
    color_mode = params.color_mode
    grayscale_level = params.grayscale_level or 4
    palette_name = params.palette_name or "rgb"
    matrix_size = params.matrix_size or 2

    if type == "floyd_steinberg":
        processed_image = apply_floyd_steinberg_dithering(
            image,
            color_mode=color_mode,
            grayscale_level=grayscale_level,
            palette_name=palette_name,
        )

    elif type == "bayer":
        processed_image = apply_bayer_dithering(
            image,
            color_mode=color_mode,
            palette_name=palette_name,
            matrix_size=matrix_size,
        )
    elif type == "random":
        pass

    # 이미지 데이터를 바이트 스트림으로 변환
    success, buffer = cv2.imencode(".jpg", processed_image)
    if not success:
        return Response(content="Image encoding failed")

    img_bytes = buffer.tobytes()

    return Response(content=img_bytes, media_type="image/jpeg")


class GlitchParameters(BaseModel):
    shift_amount: Optional[int] = None
    direction: Optional[str] = None
    noise_type: Optional[str] = None


@app.post("/glitch")
async def glitch_image(
    file: UploadFile = File(...), params: GlitchParameters = Depends()
):
    image = np.fromstring(await file.read(), np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)

    if image is None:
        return JSONResponse(content={"error": "Invalid image format"}, status_code=400)

    processed_image = image.copy()

    shift_amount = params.shift_amount or 5
    direction = params.direction or "horizontal"
    noise_type = params.noise_type or "gaussian"

    processed_image = add_glitch(
        processed_image,
        shift_amount=shift_amount,
        direction=direction,
        noise_type=noise_type,
    )

    # 이미지 데이터를 바이트 스트림으로 변환
    success, buffer = cv2.imencode(".jpg", processed_image)
    if not success:
        return Response(content="Image encoding failed")

    img_bytes = buffer.tobytes()

    return Response(content=img_bytes, media_type="image/jpeg")


@app.post("/noise")
async def noise_image(file: UploadFile = File(...)):
    pass


@app.get("/")
async def read_root():
    return {"message": "Welcome to Enhancify API"}
