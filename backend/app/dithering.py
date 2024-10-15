import cv2
import numpy as np
from sklearn.cluster import KMeans

from .palette_presets import PALETTES
from .image_processing import pixelate, resize_image, adjust_brightness

# 디더링
# 1. 플로이드 슈타이너 디더링
#    - 파라미터: 그레이 스케일 단계
# 2. 베이어 디더링


def find_nearest_color(palette, color):
    distances = np.sqrt(np.sum((palette - color) ** 2, axis=1))
    return palette[np.argmin(distances)]


def rgb_dithering(image: np.ndarray, palette_name: str = None):
    h, w = image.shape[:2]
    image = resize_image(image, 800)
    # image = pixelate(image, 10)
    image = image.astype(float)

    if palette_name and palette_name in PALETTES:
        palette = PALETTES[palette_name]
    else:
        raise ValueError("Invalid palette name")

    for y in range(h):
        for x in range(w):
            old_pixel = image[y, x]
            new_pixel = find_nearest_color(palette, old_pixel)
            image[y, x] = new_pixel
            quant_error = old_pixel - new_pixel
            if x + 1 < w:
                image[y, x + 1] += quant_error * 7 / 16
            if y + 1 < h and x - 1 >= 0:
                image[y + 1, x - 1] += quant_error * 3 / 16
            if y + 1 < h:
                image[y + 1, x] += quant_error * 5 / 16
            if y + 1 < h and x + 1 < w:
                image[y + 1, x + 1] += quant_error * 1 / 16
    return np.clip(image, 0, 255).astype(np.uint8)


def gray_dithering(image: np.ndarray, grayscale_level: int):
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    h, w = gray_image.shape
    image = gray_image.astype(float)
    scale = 255 // (grayscale_level - 1)

    for y in range(h):
        for x in range(w):
            old_pixel = image[y, x]
            new_pixel = round((old_pixel / 255) * (grayscale_level - 1)) * scale
            image[y, x] = new_pixel

            quant_error = old_pixel - new_pixel
            if x + 1 < w:
                image[y, x + 1] += quant_error * 7 / 16
            if y + 1 < h and x - 1 >= 0:
                image[y + 1, x - 1] += quant_error * 3 / 16
            if y + 1 < h:
                image[y + 1, x] += quant_error * 5 / 16
            if y + 1 < h and x + 1 < w:
                image[y + 1, x + 1] += quant_error * 1 / 16

    image = np.clip(image, 0, 255).astype(np.uint8)
    return image


def generate_bayer_matrix(n):
    matrix = np.array([[0, 2], [3, 1]], dtype=float)

    if n == 2:
        matrix = np.array([[0, 2], [3, 1]], dtype=float)
    elif n == 4:
        matrix = np.array(
            [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]], dtype=float
        )
    elif n == 8:
        matrix = np.array(
            [
                [0, 48, 12, 60, 3, 51, 15, 63],
                [32, 16, 44, 28, 35, 19, 47, 31],
                [8, 56, 4, 52, 11, 59, 7, 55],
                [40, 24, 36, 20, 43, 27, 39, 23],
                [2, 50, 14, 62, 1, 49, 13, 61],
                [34, 18, 46, 30, 33, 17, 45, 29],
                [10, 58, 6, 54, 9, 57, 5, 53],
                [42, 26, 38, 22, 41, 25, 37, 21],
            ],
            dtype=float,
        )
    # 정규화
    result = (matrix + 0.5) / (matrix * matrix)
    return result


def rgb_bayer_dithering(image: np.ndarray, palette_name: str, matrix_size: int):
    bayer_matrix = generate_bayer_matrix(matrix_size)

    h, w = image.shape[:2]

    image = image.astype(float)

    if palette_name and palette_name in PALETTES:
        palette = PALETTES[palette_name]
    else:
        raise ValueError("Invalid palette name")

    for y in range(h):
        for x in range(w):
            old_pixel = image[y, x]
            i = y % bayer_matrix.shape[0]
            j = x % bayer_matrix.shape[1]
            threshold = bayer_matrix[i, j]

            new_pixel = old_pixel + (threshold - 0.5) * 255
            new_pixel = np.clip(new_pixel, 0, 255)
            new_pixel = find_nearest_color(palette, new_pixel)
            image[y, x] = new_pixel

    return image.astype(np.uint8)


def gray_bayer_dithering(image: np.ndarray, matrix_size: int = 4):
    bayer_matrix = generate_bayer_matrix(matrix_size)

    if bayer_matrix is None:
        raise ValueError(f"Invalid matrix size: {matrix_size}. Must be 2, 4, or 8.")

    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    image_normalized = image / 255.0

    matrix_size = bayer_matrix.shape[0]

    h, w = image.shape
    tile_height = int(np.ceil(h / matrix_size))
    tile_width = int(np.ceil(w / matrix_size))

    threshold_map = np.tile(bayer_matrix, (tile_height, tile_width))
    threshold_map = threshold_map[:h, :w]

    dithered = image_normalized > threshold_map
    dithered_image = (dithered * 255).astype(np.uint8)

    return dithered_image


def apply_bayer_dithering(
    image: np.ndarray,
    color_mode: str,
    matrix_size: int,
    palette_name: str,
) -> np.ndarray:

    if color_mode == "rgb":
        return rgb_bayer_dithering(image, palette_name, matrix_size)
    else:
        return gray_bayer_dithering(image, matrix_size)


def apply_floyd_steinberg_dithering(
    image: np.ndarray,
    color_mode: str,
    grayscale_level: int,
    palette_name: str,
) -> np.ndarray:
    if color_mode == "rgb":
        return rgb_dithering(image, palette_name)
    else:
        return gray_dithering(image, grayscale_level)
