import cv2
import numpy as np


def process_image(image: np.ndarray) -> np.ndarray:
    denoised = cv2.fastNlMeansDenoisingColored(image, None, 10, 10, 7, 21)

    kernel = np.array([[-1, -1, -1], [-1, 9, -1], [-1, -1, -1]])
    sharpened = cv2.filter2D(denoised, -1, kernel)
    return sharpened
