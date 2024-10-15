import numpy as np
import cv2


def add_gaussian_noise(image: np.ndarray, strength: float) -> np.ndarray:
    # 노이즈 추가할때 255를 넘어가는 값이 생기는 경우가 있어서 정확도를 위해 float32로 변환.
    # 가우시안 노이즈는 평균과 표준편차로 계산하며, 이때 소수점 및 음수값이 포함된다. 따라서 부동소수점 연산이 필요하다.
    # 노이즈를 추가한 후에는 다시 uint8로 변환하여 반환한다.
    image = image.copy().astype(np.float32)
    mean = 0
    max_std_dev = 50
    std_dev = strength * max_std_dev
    gaussian = np.random.normal(mean, std_dev, image.shape)
    noisy_image = image + gaussian
    return np.clip(noisy_image, 0, 255).astype(np.uint8)


def add_salt_pepper_noise(image: np.ndarray, strength: float) -> np.ndarray:
    image = image.copy()
    # 최대 노이즈 적용 확률 10%
    max_prob = 0.1
    # 실제 노이즈 적용 확률
    prob = strength * max_prob
    noisy_image = image.copy()

    # 이미지 크기에 해당하는 랜덤 매트릭스 생성 (0, 1 균일 분포)
    random_matrix = np.random.rand(*image.shape[:2])

    # 랜덤 매트릭스 값이 prob/2 보다 작으면 salt 노이즈 적용
    slat_mask = random_matrix < (prob / 2)
    # 랜덤 매트릭스 값이 prob/2 보다 크고 prob 보다 작으면 pepper 노이즈 적용
    pepper_mask = (random_matrix >= (prob / 2)) & (random_matrix < prob)

    # 노이즈 마스크를 이용하여 노이즈 적용
    noisy_image[slat_mask] = 255
    noisy_image[pepper_mask] = 0

    return noisy_image


def add_speckle_noise(image: np.ndarray, strength: float):
    image = image.copy().astype(np.float32)
    max_strength = 0.5
    speckle_strength = strength * max_strength
    speckle = np.random.rand(*image.shape)
    speckle_image = image + image * speckle * speckle_strength
    return np.clip(speckle_image, 0, 255).astype(np.uint8)


def add_noise(image: np.ndarray, noise_type: str, noise_strength: float):
    if noise_type == "gaussian":
        return add_gaussian_noise(image, noise_strength)
    elif noise_type == "salt_pepper":
        return add_salt_pepper_noise(image, noise_strength)
    elif noise_type == "speckle":
        return add_speckle_noise(image, noise_strength)
    else:
        raise ValueError("Invalid noise type")
