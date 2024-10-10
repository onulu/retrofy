export enum ColorPalettes {
  ZX_SPECTRUM = 'zx_spectrum',
  COMMODORE64 = 'commodore64',
  APPLE2 = 'apple2',
  NES = 'nes',
  GAMEBOY = 'gameboy',
  CGA = 'cga',
  EGA = 'ega',
  VGA = 'vga',
  GRAYSCALE = 'grayscale',
}

export enum FilterModels {
  DITHERING = 'dithering',
  GLITCH = 'glitch',
  LIGHTLEAKS = 'lightleaks',
  VIGNETTING = 'vignetting',
}

export type DitheringParams = {
  type: 'floyd_steinberg' | 'bayer'
  colorMode: 'rgb' | 'grayscale'
  paletteName?: ColorPalettes
  grayscaleLevel?: number
  matrixSize?: number
}

export type GlitchParams = {
  shiftAmount?: number
}

export type FilterParams = DitheringParams | GlitchParams
