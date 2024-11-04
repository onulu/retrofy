import numpy as np

PALETTES = {
    "zx_spectrum": np.array(
        [
            [0, 0, 0],  # Black
            [0, 0, 215],  # Blue
            [215, 0, 0],  # Red
            [215, 0, 215],  # Magenta
            [0, 215, 0],  # Green
            [0, 215, 215],  # Cyan
            [215, 215, 0],  # Yellow
            [215, 215, 215],  # White
        ],
        dtype=np.uint8,
    ),
    "commodore64": np.array(
        [
            [0, 0, 0],  # Black
            [255, 255, 255],  # White
            [136, 0, 0],  # Red
            [170, 255, 238],  # Cyan
            [204, 68, 204],  # Purple
            [0, 204, 85],  # Green
            [0, 0, 170],  # Blue
            [238, 238, 119],  # Yellow
            [221, 136, 85],  # Orange
            [102, 68, 0],  # Brown
            [255, 119, 119],  # Light Red
            [51, 51, 51],  # Dark Grey
            [119, 119, 119],  # Grey
            [170, 255, 102],  # Light Green
            [0, 136, 255],  # Light Blue
            [187, 187, 187],  # Light Grey
        ],
        dtype=np.uint8,
    ),
    "apple2": np.array(
        [
            [0, 0, 0],  # Black
            [114, 38, 64],  # Magenta
            [64, 51, 127],  # Dark Blue
            [228, 52, 254],  # Purple
            [14, 89, 64],  # Dark Green
            [128, 128, 128],  # Grey
            [27, 154, 254],  # Medium Blue
            [191, 179, 255],  # Light Blue
            [64, 76, 0],  # Brown
            [228, 101, 1],  # Orange
            [128, 128, 128],  # Grey
            [241, 166, 191],  # Pink
            [27, 203, 1],  # Light Green
            [191, 204, 128],  # Yellow
            [141, 217, 191],  # Aqua
            [255, 255, 255],  # White
        ],
        dtype=np.uint8,
    ),
    "nintendo": np.array(
        [
            [124, 124, 124],  # Light Grey
            [0, 0, 252],  # Blue
            [0, 0, 188],  # Dark Blue
            [68, 40, 188],  # Purple
            [148, 0, 132],  # Pink
            [168, 0, 32],  # Red
            [168, 16, 0],  # Orange
            [136, 20, 0],  # Brown
            [80, 48, 0],  # Dark Brown
            [0, 120, 0],  # Green
            [0, 104, 0],  # Dark Green
            [0, 88, 0],  # Darker Green
            [0, 64, 88],  # Teal
            [0, 0, 0],  # Black
            [0, 0, 0],  # Black (duplicate)
            [0, 0, 0],  # Black (duplicate)
        ],
        dtype=np.uint8,
    ),
    "gameboy": np.array(
        [
            [155, 188, 15],  # Lightest Green
            [139, 172, 15],  # Light Green
            [48, 98, 48],  # Dark Green
            [15, 56, 15],  # Darkest Green
        ],
        dtype=np.uint8,
    ),
    "ega": np.array(
        [
            [0, 0, 0],  # Black
            [0, 0, 170],  # Blue
            [0, 170, 0],  # Green
            [0, 170, 170],  # Cyan
            [170, 0, 0],  # Red
            [170, 0, 170],  # Magenta
            [170, 85, 0],  # Brown
            [170, 170, 170],  # Light Gray
            [85, 85, 85],  # Dark Gray
            [85, 85, 255],  # Light Blue
            [85, 255, 85],  # Light Green
            [85, 255, 255],  # Light Cyan
            [255, 85, 85],  # Light Red
            [255, 85, 255],  # Light Magenta
            [255, 255, 85],  # Yellow
            [255, 255, 255],  # White
        ],
        dtype=np.uint8,
    ),
    "rgb": np.array(
        [
            [0, 0, 0],  # Black
            [0, 0, 255],  # Blue
            [0, 255, 0],  # Green
            [255, 0, 0],  # Red
            [255, 255, 255],  # White
        ],
        dtype=np.uint8,
    ),
    "grayscale": np.array(
        [
            [0, 0, 0],  # Black
            [128, 128, 128],  # Gray
            [184, 184, 184],  # Gray
            [104, 104, 104],  # Light Gray
            [255, 255, 255],  # White
        ],
        dtype=np.uint8,
    ),
    "sunset": np.array(
        [
            [77, 0, 76],
            [143, 0, 118],
            [199, 0, 131],
            [245, 0, 120],
            [255, 71, 100],
            [255, 147, 147],
            [255, 213, 204],
            [255, 243, 240],
            [0, 2, 33],
            [0, 7, 105],
            [0, 34, 143],
            [0, 80, 199],
            [0, 139, 245],
            [0, 187, 255],
            [71, 237, 255],
            [147, 255, 248],
        ],
        dtype=np.uint8,
    ),
    "hollow": np.array(
        [
            [251, 245, 239],
            [242, 211, 171],
            [198, 159, 165],
            [139, 109, 156],
            [73, 77, 126],
            [39, 39, 68],
        ],
        dtype=np.uint8,
    ),
}
