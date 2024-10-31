from pydantic import BaseModel
from typing import Optional


class ImageProcessingBase(BaseModel):
    output_size: Optional[int] = 800
    output_format: Optional[str] = "jpg"
    output_quality: Optional[int] = 95


class DitheringParameters(ImageProcessingBase):
    type: str
    color_mode: str
    grayscale_level: Optional[int] = 4
    palette_name: Optional[str] = "rgb"
    matrix_size: Optional[int] = 2
    pixel_size: Optional[int] = 1


class GlitchParameters(ImageProcessingBase):
    shift_amount: Optional[int] = 5
    direction: Optional[str] = "horizontal"
    noise_type: Optional[str] = "gaussian"
    noise_strength: Optional[float] = 0.1


class HalftoneParameters(ImageProcessingBase):
    size: Optional[int] = 10
    jump: Optional[int] = None
    bg_color: Optional[str] = "#ffffff"
    color: Optional[str] = "#000000"
    max_dot_size_ratio: Optional[float] = 1.4


class PasscodeCheck(BaseModel):
    passcode: str
