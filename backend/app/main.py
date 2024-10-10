from pydantic import BaseModel

from fastapi import FastAPI, File, UploadFile, Depends
from fastapi.responses import Response, JSONResponse
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from typing import Optional

import cv2
import numpy as np

from .image_processing import process_image, dither_image
from .dithering import apply_floyd_steinberg_dithering, apply_bayer_dithering

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
    grayscale_level = params.grayscale_level
    palette_name = params.palette_name
    matrix_size = params.matrix_size

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
            grayscale_level=grayscale_level,
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


@app.post("/glitch")
async def glitch_image(file: UploadFile = File(...)):
    # 업로드된 파일을 numpy 배열로 변환
    image = np.fromstring(await file.read(), np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)

    processed_image = process_image(image)

    # 이미지 데이터를 바이트 스트림으로 변환
    _, buffer = cv2.imencode(".jpg", processed_image)
    io_buf = BytesIO(buffer)

    # StreamingResponse로 이미지 전송
    return StreamingResponse(io_buf, media_type="image/png")


@app.post("/halftone")
async def halftone_image(file: UploadFile = File(...)):
    # 업로드된 파일을 numpy 배열로 변환
    image = np.fromstring(await file.read(), np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)

    processed_image = process_image(image)

    # 이미지 데이터를 바이트 스트림으로 변환
    _, buffer = cv2.imencode(".jpg", processed_image)
    io_buf = BytesIO(buffer)

    # StreamingResponse로 이미지 전송
    return StreamingResponse(io_buf, media_type="image/jpeg")


@app.post("/noise")
async def noise_image(file: UploadFile = File(...)):
    # 업로드된 파일을 numpy 배열로 변환
    image = np.fromstring(await file.read(), np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)

    processed_image = process_image(image)

    # 이미지 데이터를 바이트 스트림으로 변환
    _, buffer = cv2.imencode(".jpg", processed_image)
    io_buf = BytesIO(buffer)

    # StreamingResponse로 이미지 전송
    return StreamingResponse(io_buf, media_type="image/jpeg")


@app.post("/enhance")
async def enhance_image(file: UploadFile = File(...)):
    # 업로드된 파일을 numpy 배열로 변환
    image = np.fromstring(await file.read(), np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)

    processed_image = process_image(image)

    # 이미지 데이터를 바이트 스트림으로 변환
    _, buffer = cv2.imencode(".jpg", processed_image)
    io_buf = BytesIO(buffer)

    # StreamingResponse로 이미지 전송
    return StreamingResponse(io_buf, media_type="image/jpeg")


@app.get("/")
async def read_root():
    return {"message": "Welcome to Enhancify API"}
