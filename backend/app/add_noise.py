import numpy as np
import cv2


def add_gaussian_noise(
    image: np.ndarray, strength: int, weight: float = 0.5
) -> np.ndarray:
    """
    Add Gaussian noise to an image.

    Args:
        strength (int): 표준편차로 노이즈의 강도를 결정한다. 5 - 50 / 프론트에서 받을때는 5, 10단계로 받을것
        weight (float): 이미지와 합칠때의 강도 0.0 - 1.0 사이

    Returns:
        image: 노이즈가 적용된 이미지(ndarray) 반환
    """

    noise = np.random.normal(0, strength, image.shape).astype(np.float32)
    noisy_image = cv2.addWeighted(image, 1, noise, weight, 0)

    return noisy_image
