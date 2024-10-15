import numpy as np
import cv2


def add_gaussian_noise(image: np.ndarray, strength: int = 100) -> np.ndarray:
    image = image.copy()
    mean = 0
    std_dev = strength
    gaussian = np.random.normal(mean, std_dev, image.shape).astype(np.float32)
    noisy_image = cv2.addWeighted(image, 0.8, gaussian, 0.2, 0)
    return noisy_image


def add_salt_pepper_noise(image: np.ndarray):
    image = image.copy()
    salt_pepper = np.random.choice([0, 255], image.shape, p=[0.99, 0.01]).astype(
        np.uint8
    )
    noisy_image = cv2.bitwise_or(image, salt_pepper)
    return noisy_image


def add_speckle_noise(image: np.ndarray, strength: float = 1):
    image = image.copy()
    speckle = np.random.rand(*image.shape).astype(np.int8)
    speckle_image = image + image * speckle * strength
    noisy_image = cv2.addWeighted(image, 0.8, speckle_image, 0.2, 0)
    return noisy_image


def add_noise(image: np.ndarray, noise_type: str):
    if noise_type == "gaussian":
        return add_gaussian_noise(image)
    elif noise_type == "salt_pepper":
        return add_salt_pepper_noise(image)
    elif noise_type == "speckle":
        return add_speckle_noise(image)
    else:
        raise ValueError("Invalid noise type")
