import numpy as np
import cv2

from .add_noise import add_noise

import numpy as np
import cv2
from typing import Tuple


def add_glitch(
    image: np.ndarray,
    intensity: float,
    tracking_error: float,
    color_bleeding: float,
    noise_amount: float,
    color_shift: float,
) -> np.ndarray:
    image = image.copy()
    h, w = image.shape[:2]

    def apply_color_shift(
        b: np.ndarray, g: np.ndarray, r: np.ndarray
    ) -> Tuple[np.ndarray, np.ndarray, np.ndarray]:
        # Create random color shift regions
        num_shifts = int(color_shift * 10)
        for _ in range(num_shifts):
            # Random region
            y = np.random.randint(0, h)
            height = np.random.randint(10, 50)
            if y + height > h:
                height = h - y

            # Random color adjustments
            color_scale = np.random.uniform(0.8, 1.2, 3)  # RGB scaling
            color_offset = np.random.randint(-30, 30, 3)  # RGB offset

            # Apply to region
            b[y : y + height] = np.clip(
                b[y : y + height] * color_scale[0] + color_offset[0], 0, 255
            )
            g[y : y + height] = np.clip(
                g[y : y + height] * color_scale[1] + color_offset[1], 0, 255
            )
            r[y : y + height] = np.clip(
                r[y : y + height] * color_scale[2] + color_offset[2], 0, 255
            )

        # Global color tint
        if np.random.random() < color_shift:
            tint = np.random.uniform(0.9, 1.1, 3)
            b = np.clip(b * tint[0], 0, 255)
            g = np.clip(g * tint[1], 0, 255)
            r = np.clip(r * tint[2], 0, 255)

        # Random color channel swap (rare effect)
        if np.random.random() < color_shift * 0.2:
            channels = [b, g, r]
            np.random.shuffle(channels)
            b, g, r = channels

        return b, g, r

    # 1. Tracking errors (vertical displacement waves)
    def create_tracking_error():
        displacement = np.zeros((h, w), np.float32)
        for y in range(h):
            # Create wave-like displacement
            wave = np.sin(y * 0.01) * np.sin(y * 0.005) * tracking_error * 20
            displacement[y] = np.full(w, wave)
        return displacement

    # 2. Color bleeding effect
    def apply_color_bleeding(channels: Tuple):
        b, g, r = channels
        # Horizontal color bleeding
        kernel_size = int(7 * color_bleeding)
        if kernel_size % 2 == 0:
            kernel_size += 1
        kernel = np.zeros((kernel_size, kernel_size))
        kernel[kernel_size // 2, :] = 1.0 / kernel_size

        b = cv2.filter2D(b, -1, kernel)
        g = cv2.filter2D(g, -1, kernel)
        r = cv2.filter2D(r, -1, kernel)

        return b, g, r

    # 3. Add scanlines
    def add_scanlines():
        scanlines = np.zeros((h, w), np.float32)
        for y in range(0, h, 2):
            scanlines[y, :] = 0.1
        return scanlines

    # Split channels
    b, g, r = cv2.split(image)

    if color_shift > 0:
        b, g, r = apply_color_shift(b, g, r)

    # Apply tracking errors
    if tracking_error > 0:
        displacement = create_tracking_error()
        for x in range(w):
            for y in range(h):
                offset = int(displacement[y, x])
                if 0 <= y + offset < h:
                    b[y, x] = b[min(max(y + offset, 0), h - 1), x]
                    g[y, x] = g[min(max(y + offset - 2, 0), h - 1), x]
                    r[y, x] = r[min(max(y + offset + 2, 0), h - 1), x]

    # Apply color bleeding
    b, g, r = apply_color_bleeding((b, g, r))

    # Add noise
    if noise_amount > 0:
        noise = np.random.normal(0, noise_amount * 50, (h, w))
        b = np.clip(b + noise, 0, 255)
        g = np.clip(g + noise, 0, 255)
        r = np.clip(r + noise, 0, 255)

    # Add scanlines
    scanlines = add_scanlines()
    b = b - scanlines
    g = g - scanlines
    r = r - scanlines

    # Random horizontal displacement lines
    num_glitch_lines = int(intensity * 5)
    for _ in range(num_glitch_lines):
        y = np.random.randint(0, h)
        shift = np.random.randint(-20, 20)
        height = np.random.randint(2, 10)
        if 0 <= y + height <= h:
            b[y : y + height] = np.roll(b[y : y + height], shift, axis=1)
            g[y : y + height] = np.roll(g[y : y + height], shift - 2, axis=1)
            r[y : y + height] = np.roll(r[y : y + height], shift + 2, axis=1)

    # Merge channels and ensure valid range
    result = cv2.merge([b, g, r])
    return np.clip(result, 0, 255).astype(np.uint8)


def apply_glitch_effect(image, params):
    return add_glitch(
        image,
        intensity=params.intensity,
        tracking_error=params.tracking_error,
        color_bleeding=params.color_bleeding,
        noise_amount=params.noise_amount,
        color_shift=params.color_shift,
    )
