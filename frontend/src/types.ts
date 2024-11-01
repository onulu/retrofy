export enum ColorPalettes {
  ZX_SPECTRUM = 'zx_spectrum',
  COMMODORE64 = 'commodore64',
  APPLE2 = 'apple2',
  nintendo = 'nintendo',
  GAMEBOY = 'gameboy',
  EGA = 'ega',
  GRAYSCALE = 'grayscale',
  RGB = 'rgb',
  SUNSET = 'sunset',
  HOLLOW = 'hollow',
}

export enum FilterModels {
  HALFTONE = 'halftone',
  DITHERING = 'dithering',
  PIXELATE = 'pixelate',
  GLITCH = 'glitch',
}

export type DitheringParams = {
  type: 'floyd_steinberg' | 'bayer'
  colorMode: 'rgb' | 'grayscale'
  paletteName?: ColorPalettes
  grayscaleLevel?: number
  matrixSize?: number
} & CommonParams

export type PixelateParams = {
  pixelSize?: number
  paletteName?: ColorPalettes
} & CommonParams

export type GlitchParams = {
  intensity?: number
  trackingError?: number
  colorBleeding?: number
  noiseAmount?: number
  colorShift?: number
} & CommonParams

export type HalftoneParams = {
  size?: number
  jump?: number
  color?: string
  bgColor?: string
  maxDotSizeRatio?: number
} & CommonParams

export type CommonParams = {
  outputSize: number
  outputFormat: 'png' | 'jpeg' | 'webp'
  outputQuality?: number
}

export type FilterParams = DitheringParams | GlitchParams | PixelateParams
