from pydantic import BaseModel

from fastapi import FastAPI, File, UploadFile, Depends
from fastapi.responses import Response, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

import cv2
import numpy as np

from .dithering import apply_floyd_steinberg_dithering, apply_bayer_dithering
from .add_glitch import add_glitch
from .image_processing import resize_image, compress_image, pixelate

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
    pixel_size: Optional[int] = None
    output_size: Optional[int] = None
    output_format: Optional[str] = None
    output_quality: Optional[int] = None


@app.post("/dithering")
async def apply_dithering(
    file: UploadFile = File(...), params: DitheringParameters = Depends()
):
    type = params.type
    color_mode = params.color_mode
    grayscale_level = params.grayscale_level or 4
    palette_name = params.palette_name or "rgb"
    matrix_size = params.matrix_size or 2
    pixel_size = params.pixel_size or 1
    output_size = params.output_size or 640
    output_format = params.output_format or "jpg"
    output_quality = params.output_quality or 95

    image = np.fromstring(await file.read(), np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)

    image = resize_image(image, output_size)
    if image is None:
        return JSONResponse(content={"error": "Invalid image format"}, status_code=400)

    processed_image = image.copy()

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

    if pixel_size > 0:
        processed_image = pixelate(processed_image, pixel_size)

    processed_image, buffer = compress_image(
        processed_image, output_format, output_quality
    )

    # 이미지 데이터를 바이트 스트림으로 변환
    if not processed_image:
        return Response(content="Image encoding failed")

    img_bytes = buffer.tobytes()

    return Response(content=img_bytes, media_type=f"image/{output_format}")


class GlitchParameters(BaseModel):
    shift_amount: Optional[int] = None
    direction: Optional[str] = None
    noise_type: Optional[str] = None
    noise_strength: Optional[float] = None
    output_size: Optional[int] = None
    output_format: Optional[str] = None
    output_quality: Optional[int] = None


@app.post("/glitch")
async def glitch_image(
    file: UploadFile = File(...), params: GlitchParameters = Depends()
):
    shift_amount = params.shift_amount or 5
    direction = params.direction or "horizontal"
    noise_type = params.noise_type or "gaussian"
    noise_strength = params.noise_strength or 0.1
    output_size = params.output_size or 640
    output_format = params.output_format or "png"
    output_quality = params.output_quality or 95
    image = np.fromstring(await file.read(), np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)

    image = resize_image(image, max_size=output_size)

    if image is None:
        return JSONResponse(content={"error": "Invalid image format"}, status_code=400)

    processed_image = image.copy()

    processed_image = add_glitch(
        processed_image,
        shift_amount=shift_amount,
        direction=direction,
        noise_type=noise_type,
        noise_strength=noise_strength,
    )

    processed_image, buffer = compress_image(
        processed_image, output_format, output_quality
    )

    # 이미지 데이터를 바이트 스트림으로 변환
    if not processed_image:
        return Response(content="Image encoding failed")

    img_bytes = buffer.tobytes()

    return Response(content=img_bytes, media_type=f"image/{output_format}")


@app.post("/noise")
async def noise_image(file: UploadFile = File(...)):
    pass


@app.get("/")
async def read_root():
    return {"message": "Welcome to Enhancify API"}
