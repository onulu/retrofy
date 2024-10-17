import { Upload } from 'lucide-react'

import { Button } from '../ui/button'
import useStore from '@/store'
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider'

const ImagePreview = () => {
  const originalImage = useStore((state) => state.originalImage)
  const setOriginalImage = useStore((state) => state.setOriginalImage)
  const setEnhancedImage = useStore((state) => state.setEnhancedImage)
  const enhancedImage = useStore((state) => state.enhancedImage)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setOriginalImage(file)
      setEnhancedImage(null)
    }
  }

  if (!originalImage) {
    return (
      <>
        <input
          type="file"
          id="upload-image"
          accept="image/*"
          multiple={false}
          className="hidden"
          onChange={handleImageChange}
        />
        <Button
          variant="outline"
          aria-label="Upload image"
          onClick={() => {
            document.getElementById('upload-image')?.click()
          }}
        >
          <Upload className="mr-2" />
          Choose image
        </Button>
      </>
    )
  }

  if (!enhancedImage) {
    return (
      <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center">
        <img
          src={originalImage.url}
          alt="Original Image"
          className="max-w-full max-h-full w-auto h-auto object-contain"
        />
      </div>
    )
  }

  return (
    <>
      <ReactCompareSlider
        className="flex items-center justify-center"
        itemOne={
          <ReactCompareSliderImage
            alt="original image"
            src={originalImage.url}
            className="max-w-full max-h-full w-auto h-auto object-contain"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            alt="enhanced image"
            src={enhancedImage?.url || undefined}
            className="max-w-full max-h-full w-auto h-auto object-contain"
          />
        }
      />
    </>
  )
}

export default ImagePreview
