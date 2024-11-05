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


class PixelateParameters(ImageProcessingBase):
    pixel_size: Optional[int] = 1
    palette_name: Optional[str] = None


class GlitchParameters(ImageProcessingBase):
    intensity: Optional[float] = 0.5
    tracking_error: Optional[float] = 0.5
    color_bleeding: Optional[float] = 0.6
    noise_amount: Optional[float] = 0.15
    color_shift: Optional[float] = 0.5


# class HalftoneParameters(ImageProcessingBase):
#     size: Optional[int] = 10
#     jump: Optional[int] = None
#     bg_color: Optional[str] = "#ffffff"
#     color: Optional[str] = "#000000"
#     max_dot_size_ratio: Optional[float] = 1.4


class HalftoneParameters(ImageProcessingBase):
    dot_size: int = 20
    dot_spacing: Optional[int] = None
    min_radius: Optional[int] = 1
    max_radius: Optional[int] = 10
    background: Optional[str] = "#ffffff"
    foreground: Optional[str] = "#000000"


class NoiseParameters(BaseModel):
    noise_type: Optional[str] = "gaussian"
    noise_strength: Optional[float] = 0.5


class PasscodeCheck(BaseModel):
    passcode: str
