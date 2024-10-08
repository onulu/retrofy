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
from .dithering import apply_floyd_steinberg_dithering

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
    dithering_type: str
    color_mode: str
    grayscale_level: Optional[int] = None
    color_num: Optional[int] = None


# @app.post("/dithered")
# async def apply_dithered_image(
#     file: UploadFile = File(...), params: DitheringParameters = Depends()
# ):
#     image_bytes = await file.read()
#     # numpy배열로 변환 후 opencv 이미지로 디코딩
#     np_array = np.frombuffer(image_bytes, np.uint8)
#     img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

#     if img is None:
#         return JSONResponse(content={"error": "Invalid image format"}, status_code=400)

#     processed_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#     _, buffer = cv2.imencode(".jpg", processed_image)
#     processed_img_bytes = buffer.tobytes()
#     return Response(content=processed_img_bytes, media_type="image/jpeg")


@app.post("/dither")
async def apply_dithering(
    file: UploadFile = File(...), params: DitheringParameters = Depends()
):
    image = np.fromstring(await file.read(), np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)

    if image is None:
        return JSONResponse(content={"error": "Invalid image format"}, status_code=400)

    processed_image = image.copy()

    dithering_type = params.dithering_type
    color_mode = params.color_mode
    grayscale_level = params.grayscale_level
    color_num = params.color_num

    if dithering_type == "floyd-steinberg":
        processed_image = apply_floyd_steinberg_dithering(
            image,
            color_mode=color_mode,
            grayscale_level=grayscale_level,
            color_num=color_num,
        )

    elif dithering_type == "bayer":
        pass
    elif dithering_type == "random":
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
