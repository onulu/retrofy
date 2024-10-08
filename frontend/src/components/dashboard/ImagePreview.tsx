import { useEffect } from 'react'
import { Upload } from 'lucide-react'

import { Button } from '../ui/button'
import useStore from '@/store'

const ImagePreview = () => {
  const originalImage = useStore((state) => state.originalImage)
  const enhancedImage = useStore((state) => state.enhancedImage)

  useEffect(() => {
    console.log('enhancedImage!', enhancedImage)
  }, [enhancedImage])

  return (
    <>
      {originalImage ? (
        <>
          <img
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
          )}
        </>
      ) : (
        <>
          <Button
            aria-label="Upload image"
            onClick={() => {
              document.getElementById('input-file')?.click()
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
