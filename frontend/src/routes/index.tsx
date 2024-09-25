import { useState } from 'react'

import EnhancementOptions from '../components/EnhancementOptions'
import ImageUpload from '../components/ImageUpload'

import { getEnhanceImage } from '../services/api'
import { Button } from '@/components/ui/button'
import Playground from '@/components/Playground'

export default function Index() {
  // const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  // const [options, setOptions] = useState<Record<string, number>>({})
  // const [enhancedImageBlob, setEnhancedImageBlob] = useState<Blob | null>(null)

  // const handleImageUpload = (file: File) => {
  //   setUploadedImage(file)
  // }

  // const handleOptionsChange = (options: Record<string, number>) => {
  //   setOptions(options)
  // }

  // const handleEnhanceImage = async () => {
  //   if (!uploadedImage) return
  //   setEnhancedImageBlob(null)

  //   try {
  //     const enhancedBlob = await getEnhanceImage(uploadedImage, options)
  //     console.log('enhancedBlob', enhancedBlob)
  //     setEnhancedImageBlob(enhancedBlob)
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  return (
    <>
      <Playground />
      {/* <EnhancementOptions onOptionsChange={handleOptionsChange} />
      <ImageUpload onImageUpload={handleImageUpload} />
      <Button onClick={handleEnhanceImage}>Enhance now</Button>
      {enhancedImageBlob && (
        <div>
          <img
            src={URL.createObjectURL(enhancedImageBlob)}
            className="h-auto"
          />
        </div>
      )} */}
    </>
  )
}
