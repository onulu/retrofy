export enum ColorPalettes {
  ZX_SPECTRUM = 'zx_spectrum',
  COMMODORE64 = 'commodore64',
  APPLE2 = 'apple2',
  NES = 'nes',
  GAMEBOY = 'gameboy',
  CGA = 'cga',
  EGA = 'ega',
  GRAYSCALE = 'grayscale',
  RGB = 'rgb',
  SUNSET = 'sunset',
  HOLLOW = 'hollow',
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
  pixelSize?: number
} & CommonParams

export type GlitchParams = {
  shiftDirection: 'horizontal' | 'vertical' | 'both'
  shiftAmount?: number
  noiseType?: 'gaussian' | 'salt_pepper' | 'speckle'
  noiseStrength?: number
} & CommonParams

export type CommonParams = {
  outputSize: number
  outputFormat: 'png' | 'jpeg' | 'webp'
  outputQuality?: number
}

export type FilterParams = DitheringParams | GlitchParams
