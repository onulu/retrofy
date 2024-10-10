import cv2
import numpy as np

# API
# /dithering - addDither
# /glitch - addGlitch
# /halftone - addHalftone
# /noise - addNoise


def dither_image(image: np.ndarray, matrix: int = 4, color: str = "bw") -> np.ndarray:
    processed_image = image.copy()

    if color == "bw":
        processed_image = cv2.cvtColor(processed_image, cv2.COLOR_BGR2GRAY)

    return processed_image


def process_image(image: np.ndarray, options: dict = None) -> np.ndarray:
    processed_image = image.copy()

    noise = np.random.normal(0, 5, processed_image.shape).astype(np.uint8)
    noisy_image = cv2.addWeighted(processed_image, 1, noise, 0.1, 0)

    return noisy_image
