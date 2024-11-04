import cv2
import numpy as np
from .palette_presets import PALETTES
from .add_dithering import find_nearest_colors_vectorized


def add_pixelate(image, pixel_size, palette_name=None):
    h, w = image.shape[:2]

    # Ensure pixel_size is at least 1 to prevent division by zero
    pixel_size = max(1, pixel_size)

    target_w = max(1, w // pixel_size)
    target_h = max(1, h // pixel_size)

    small = cv2.resize(image, (target_w, target_h), interpolation=cv2.INTER_NEAREST)

    if palette_name and palette_name in PALETTES:
        palette = PALETTES[palette_name]
        small = small.reshape(-1, small.shape[-1])
        small = find_nearest_colors_vectorized(palette, small)

        # Fix: Assign the reshaped array back to small
        small = small.reshape(target_h, target_w, -1).astype(np.uint8)

    # Resize back to original dimensions for consistent output size
    result = cv2.resize(small, (w, h), interpolation=cv2.INTER_NEAREST)

    return result


def apply_pixelate(image, params):
    return add_pixelate(image, params.pixel_size, params.palette_name)
