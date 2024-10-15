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

  return (
    <>
      {originalImage ? (
        <>
          <ReactCompareSlider
            className="max-h-[calc(100vh-100px)]"
            itemOne={
              <ReactCompareSliderImage
                alt="original image"
                src={originalImage.url}
                className="object-contain max-h-[calc(100vh-100px)]"
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                alt="enhanced image"
                src={enhancedImage?.url || undefined}
                className="object-contain  max-h-[calc(100vh-100px)]"
              />
            }
          />
          {/* <img
            src={originalImage.url}
            className="max-h-[90vh] object-cover"
            alt="Original image"
          />
          {enhancedImage && (
            <img
              src={enhancedImage.url}
              className="max-h-[90vh] object-cover"
              alt="enhanced image"
            />
          )} */}
        </>
      ) : (
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
            aria-label="Upload image"
            onClick={() => {
              document.getElementById('upload-image')?.click()
            }}
          >
            <Upload className="mr-2" />
            Choose image
          </Button>
        </>
      )}
    </>
  )
}

export default ImagePreview
