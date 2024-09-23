import cv2
import numpy as np


# Constants for image enhancement options
NOISE_REDUCTION = "noise_reduction"
SHARPNESS = "sharpness"
BRIGHTNESS = "brightness"
CONTRAST = "contrast"


def process_image(image: np.ndarray, options: dict) -> np.ndarray:
    processed_image = image.copy()

    if NOISE_REDUCTION in options:
        strength = options[NOISE_REDUCTION] / 100
        processed_image = cv2.fastNlMeansDenoisingColored(
            image, None, strength * 10, strength * 10, 7, 21
        )

    # Sharpness
    if SHARPNESS in options:
        strength = options[SHARPNESS] / 100
        kernel = np.array([[-1, -1, -1], [-1, 9 + strength * 4, -1], [-1, -1, -1]])
        processed_image = cv2.filter2D(image, -1, kernel)

    # Brightness
    if BRIGHTNESS in options:
        brightness = int(options[BRIGHTNESS] * 2.55)
        processed_image = cv2.add(image, np.array([brightness]))

    # Contrast
    if CONTRAST in options:
        contrast = options[CONTRAST] / 100 + 1
        processed_image = cv2.addWeighted(image, contrast, image, 0, 0)

    return processed_image
