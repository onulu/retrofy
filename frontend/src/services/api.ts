const API_BASE_URL = 'http://localhost:8000'

export async function getEnhanceImage(
  file: File,
  options: Record<string, number>
): Promise<Blob> {
  const formData = new FormData()
  formData.append('file', file)

  const queryParams = new URLSearchParams(
    Object.entries(options).map(([key, value]) => [key, value.toString()])
  )

  const response = await fetch(`${API_BASE_URL}/enhance?${queryParams}`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Image enhancement failed')
  }

  return await response.blob()
}
