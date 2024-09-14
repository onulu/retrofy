from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np

from .image_processing import process_image

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
    contents = await file.rest()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imread(nparr, cv2.IMREAD_COLOR)

    processed_img = processed_img(img)

    # 이미지를 바이트스트림으로 변환
    _, processed_img_encoded = cv2.imencode(".png", processed_img)
    processed_img_bytes = processed_img_encoded.tobytes()

    return {"image": processed_img_bytes}


@app.get("/")
async def read_root():
    return {"message": "Welcome to Enhancify API"}
