from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np

from .image_processing import (
    process_image,
    NOISE_REDUCTION,
    SHARPNESS,
    BRIGHTNESS,
    CONTRAST,
)

from typing import Union

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React 앱의 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imread(nparr, cv2.IMREAD_COLOR)

    processed_img = processed_img(img)

    # 이미지를 바이트스트림으로 변환
    _, processed_img_encoded = cv2.imencode(".png", processed_img)
    processed_img_bytes = processed_img_encoded.tobytes()

    return {"image": processed_img_bytes}


@app.post("/enhance")
async def enhance_image(
    file: UploadFile = File(...),
    noise_reduction: float = Form(0),
    sharpness: float = Form(0),
    brightness: float = Form(0),
    contrast: float = Form(0),
):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    options = {
        NOISE_REDUCTION: noise_reduction,
        SHARPNESS: sharpness,
        BRIGHTNESS: brightness,
        CONTRAST: contrast,
    }

    processed_img = process_image(img, options)
    _, processed_img_encoded = cv2.imencode(".jpg", processed_img)

    return Response(content=processed_img_encoded.tobytes(), media_type="image/jpeg")


@app.get("/")
async def read_root():
    return {"message": "Welcome to Enhancify API"}
