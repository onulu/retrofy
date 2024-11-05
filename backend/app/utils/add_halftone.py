import numpy as np
import cv2
from math import ceil
from typing import Tuple, Optional

from .image_processing import hex_to_bgr


def add_halftone_v2(
    image: np.ndarray,
    dot_size: int = 20,
    dot_spacing: Optional[int] = None,
    min_radius: int = 1,
    max_radius: int = 10,
    background: Tuple[int, int, int] = (255, 255, 255),
    foreground: Tuple[int, int, int] = (0, 0, 0),
):
    if dot_spacing is None or dot_spacing == 0:
        dot_spacing = dot_size

    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    height, width = image.shape

    h_out = ((height - 1) // dot_spacing + 1) * dot_size
    w_out = ((width - 1) // dot_spacing + 1) * dot_size

    result = np.full((h_out, w_out, 3), background, dtype=np.uint8)

    for y in range(0, height, dot_spacing):
        for x in range(0, width, dot_spacing):
            cell = image[
                y : min(y + dot_spacing, height), x : min(x + dot_spacing, width)
            ]
            intensity = np.mean(cell)

            intensity_normalized = (255 - intensity) / 255
            radius = min_radius + (max_radius - min_radius) * intensity_normalized
            radius = int(round(radius))

            y_center = (y // dot_spacing) * dot_size + dot_size // 2
            x_center = (x // dot_spacing) * dot_size + dot_size // 2

            cv2.circle(result, (x_center, y_center), radius, foreground, -1)

    return result


def add_halftone(
    image: np.ndarray,
    size: int = 10,
    jump: Optional[int] = None,
    bg_color: Tuple[int, int, int] = (255, 255, 255),
    color: Tuple[int, int, int] = (0, 0, 0),
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


def apply_halftone_v2(image, params):
    return add_halftone_v2(
        image,
        dot_size=params.dot_size,
        dot_spacing=params.dot_spacing,
        min_radius=params.min_radius,
        max_radius=params.max_radius,
        background=hex_to_bgr(params.background),
        foreground=hex_to_bgr(params.foreground),
    )
