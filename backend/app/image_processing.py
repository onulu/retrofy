import cv2
import numpy as np


def resize_image(
    image: np.ndarray, max_size: int = 1024, interpolation: int = cv2.INTER_AREA
) -> np.ndarray:
    h, w = image.shape[:2]

    if max(h, w) > max_size:
        if h > w:
            new_h, new_w = max_size, int(w * max_size / h)
        else:
            new_h, new_w = int(h * max_size / w), max_size
    else:
        return image

    return cv2.resize(image, (new_w, new_h), interpolation=interpolation)


def adjust_brightness(image: np.ndarray):
    if len(image.shape) == 3:
        yuv = cv2.cvtColor(image, cv2.COLOR_BGR2YUV)
        yuv[:, :, 0] = cv2.equalizeHist(yuv[:, :, 0])
        return cv2.cvtColor(yuv, cv2.COLOR_YUV2BGR)
    else:
        return cv2.equalizeHist(image)


def pixelate(image, pixel_size):
    h, w = image.shape[:2]
    small = cv2.resize(
        image, (w // pixel_size, h // pixel_size), interpolation=cv2.INTER_LINEAR
    )
    return cv2.resize(small, (w, h), interpolation=cv2.INTER_NEAREST)


def add_scanlines(image, intensity=0.1):
    h, w = image.shape[:2]

    scanlines = np.zeros((h, w, 3), dtype=np.uint8)
    scanlines[::2] = [0, 0, 0]
    return cv2.addWeighted(image, 1, scanlines, intensity, 0)


def color_shift(image, shift_amount):
    b, g, r = cv2.split(image)
    # random shift
    b = np.roll(b, np.random.randint(-shift_amount, shift_amount), axis=0)
    g = np.roll(g, np.random.randint(-shift_amount, shift_amount), axis=0)

    return cv2.merge([b, g, r])
