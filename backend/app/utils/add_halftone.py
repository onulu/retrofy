import numpy as np
import cv2
from math import ceil

from .image_processing import hex_to_bgr


def add_halftone(
    image: np.ndarray,
    size: int = 10,
    jump: int = None,
    bg_color: tuple = (255, 255, 255),
    color: tuple = (0, 0, 0),
    max_dot_size_ratio: float = 1.4,
):
    h, w = image.shape[:2]

    if len(image.shape) == 3:
        image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    if jump is None:
        jump = ceil(min(h, w) * 0.007)

    h_output = size * ceil(h / jump)
    w_output = size * ceil(w / jump)
    canvas = np.full((h_output, w_output, 3), bg_color, dtype=np.uint8)
    output_square = np.zeros((size, size, 3), dtype=np.uint8)

    y_output = 0
    for y in range(0, h, jump):
        x_output = 0
        for x in range(0, w, jump):
            output_square[:] = bg_color
            intensity = 1 - np.mean(image[y : y + jump, x : x + jump]) / 255
            radius = int(max_dot_size_ratio * size * intensity / 2)
            cv2.circle(output_square, (size // 2, size // 2), radius, color, -1)
            canvas[y_output : y_output + size, x_output : x_output + size] = (
                output_square
            )
            x_output += size
        y_output += size

    return canvas


def apply_halftone_effect(image, params):
    return add_halftone(
        image,
        size=params.size,
        jump=params.jump,
        bg_color=hex_to_bgr(params.bg_color),
        color=hex_to_bgr(params.color),
        max_dot_size_ratio=params.max_dot_size_ratio,
    )
