import { FilterModels, FilterParams } from '@/types'

const API_BASE_URL =
  import.meta.env.VITE_API_URL || process.env.NEXT_PUBLIC_API_URL

function toSnakeCase(
  obj: Record<string, string | number>
): Record<string, string | number> {
  const newObj: Record<string, string | number> = {}
  for (const key in obj) {
    const snakeCaseKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
    newObj[snakeCaseKey] = obj[key]
  }
  return newObj
}

async function uploadImage(
  endpoint: string,
  file: File,
  params: Record<string, number | string>
): Promise<Blob> {
  const formData = new FormData()
  formData.append('file', file)

  const queryParams = new URLSearchParams(
    Object.entries(toSnakeCase(params)).map(([key, value]) => [
      key,
      value.toString(),
    ])
  )

  const response = await fetch(`${API_BASE_URL}/${endpoint}?${queryParams}`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Image ${endpoint} failed`)
  }

  return await response.blob()
}

export async function applyFilterLogic(
  file: File,
  model: FilterModels,
  params: FilterParams
): Promise<Blob> {
  switch (model) {
    case 'dithering':
      return await uploadImageForDithering(file, params)
    case 'glitch':
      return uploadImageForGlitch(file, params)
    case 'halftone':
      return uploadImageForHalftone(file, params)
    case 'pixelate':
      return uploadImageForPixelate(file, params)
    default:
      console.log('here')
      return file
  }
}

export async function uploadImageForDithering(
  file: File,
  params: Record<string, number | string>
): Promise<Blob> {
  // dithered, dither
  return uploadImage('dithering', file, params)
}

export async function uploadImageForGlitch(
  file: File,
  params: Record<string, number | string>
): Promise<Blob> {
  return uploadImage('glitch', file, params)
}

export async function uploadImageForHalftone(
  file: File,
  params: Record<string, number | string>
): Promise<Blob> {
  return uploadImage('halftone', file, params)
}

export async function uploadImageForPixelate(
  file: File,
  params: Record<string, number | string>
): Promise<Blob> {
  return uploadImage('pixelate', file, params)
}

export async function getNoisyImage(
  file: File,
  params: Record<string, number | string>
): Promise<Blob> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('noise_type', 'gaussian')

  const queryParams = new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, value.toString()])
  )

  const response = await fetch(`${API_BASE_URL}/add_noise?${queryParams}`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json()
    if (response.status === 422) {
      throw new Error(errorData.message)
    } else {
      throw new Error('Server error.')
    }
  }

  return await response.blob()
}

export const checkPasscode = async (passcode: string) => {
  const response = await fetch(`${API_BASE_URL}/check-passcode`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ passcode }),
  })
  return response.ok
}
