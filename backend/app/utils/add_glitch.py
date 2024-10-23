import numpy as np
import cv2

from .add_noise import add_noise


def add_glitch(
    image: np.ndarray,
    shift_amount: int,
    direction: str,
    noise_type: str,
    noise_strength: float,
):
    h, w = image.shape[:2]
    image = image.copy()

    # 흑백이면 return
    if len(image.shape) == 2:
        return image

    # 채널 분리하고 이동
    b, g, r = cv2.split(image)
    shift = np.random.randint(-shift_amount, shift_amount)
    # 이미지 이동을 위한 변환 행렬 생성
    # 행렬 M은 이미지를 x축과 y축으로 shift만큼 이동시키는 변환을 정의함
    # [[1, 0, shift], [0, 1, shift]]는 2x3 변환 행렬로,
    # x축으로 shift, y축으로 shift만큼 이동시킴
    if direction == "horizontal":
        M = np.float32([[1, 0, shift], [0, 1, 0]])
    elif direction == "vertical":
        M = np.float32([[1, 0, 0], [0, 1, shift]])
    else:
        M = np.float32([[1, 0, shift], [0, 1, shift]])

    # 이미지 이동
    b = cv2.warpAffine(b, M, (w, h))
    g = cv2.warpAffine(g, M, (w, h))

    # 채널 합치기
    merged = cv2.merge((b, g, r))

    # 랜덤 글리치 라인 추가 - 이미지의 row? 일부를 잘라서 이동
    merged_copy = merged.copy()
    num_lines = np.random.randint(1, 5)
    for i in range(num_lines):
        y = np.random.randint(0, h)
        height = np.random.randint(1, 5)
        shift = np.random.randint(-10, 10)
        merged_copy[y : y + height, :] = np.roll(
            merged_copy[y : y + height, :], shift, axis=1
        )

    # 노이즈 추가
    noisy_image = add_noise(
        merged_copy, noise_type=noise_type, noise_strength=noise_strength
    )

    return noisy_image
