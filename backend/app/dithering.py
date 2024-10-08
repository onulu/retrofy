import cv2
import numpy as np

# 디더링
# 1. 플로이드 슈타이너 디더링
#    - 파라미터: 그레이 스케일 단계
# 2. 베이어 디더링


def apply_floyd_steinberg_dithering(
    image: np.ndarray, color_mode: str, grayscale_level: int = 4, color_num: int = 4
) -> np.ndarray:
    """
    흑백 디더링: 사용할 그레이 스케일 단계 옵션 설정?
    """

    if color_mode == "rgb":
        return image
    else:
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        h, w = gray_image.shape
        image = gray_image.astype(float)
        scale = 255 // (grayscale_level - 1)

        for y in range(h):
            for x in range(w):
                old_pixel = image[y, x]
                new_pixel = round((old_pixel / 255) * (grayscale_level - 1)) * scale
                image[y, x] = new_pixel

                quant_error = old_pixel - new_pixel
                if x + 1 < w:
                    image[y, x + 1] += quant_error * 7 / 16
                if y + 1 < h and x - 1 >= 0:
                    image[y + 1, x - 1] += quant_error * 3 / 16
                if y + 1 < h:
                    image[y + 1, x] += quant_error * 5 / 16
                if y + 1 < h and x + 1 < w:
                    image[y + 1, x + 1] += quant_error * 1 / 16

        image = np.clip(image, 0, 255).astype(np.uint8)
        return image


def apply_bayer_dithering(image: np.ndarray) -> np.ndarray:
    pass
