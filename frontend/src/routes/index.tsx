import { useState } from 'react'

import EnhancementOptions from '../components/EnhancementOptions'
import ImageUpload from '../components/ImageUpload'

import { getEnhanceImage } from '../services/api'

export default function Index() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [options, setOptions] = useState<Record<string, number>>({})
  const [enhancedImageBlob, setEnhancedImageBlob] = useState<Blob | null>(null)

  const handleImageUpload = (file: File) => {
    setUploadedImage(file)
  }

  const handleOptionsChange = (options: Record<string, number>) => {
    setOptions(options)
  }

  const handleEnhanceImage = async () => {
    if (!uploadedImage) return
    setEnhancedImageBlob(null)

    try {
      const enhancedBlob = await getEnhanceImage(uploadedImage, options)
      console.log('enhancedBlob', enhancedBlob)
      setEnhancedImageBlob(enhancedBlob)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="grid gap-2 lg:grid-cols-[minmax(360px,1fr)_2fr]">
      <EnhancementOptions onOptionsChange={handleOptionsChange} />
      <ImageUpload onImageUpload={handleImageUpload} />
      <button
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleEnhanceImage}
      >
        Enhance now
      </button>
      {enhancedImageBlob && (
        <div>
          <img
            src={URL.createObjectURL(enhancedImageBlob)}
            className="h-auto"
          />
        </div>
      )}
    </div>
  )
}
