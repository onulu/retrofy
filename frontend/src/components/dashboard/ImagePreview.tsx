import { Loader2, Upload } from 'lucide-react'

import { Button } from '../ui/button'
import useStore from '@/store'

const ImagePreview = () => {
  const originalImage = useStore((state) => state.originalImage)
  const setOriginalImage = useStore((state) => state.setOriginalImage)
  const setEnhancedImage = useStore((state) => state.setEnhancedImage)
  const enhancedImage = useStore((state) => state.enhancedImage)
  const isProcessing = useStore((state) => state.isProcessing)
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
          variant="muted"
          aria-label="Upload image"
          size="lg"
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
      <div className="w-full h-[calc(100dvh-57px-1rem)] flex items-center justify-center">
        <img
          src={originalImage.url}
          alt="Original Image"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    )
  }

  return isProcessing ? (
    <div className="w-full h-[calc(100dvh-57px-1rem)] flex flex-col items-center justify-center gap-2 relative">
      <div className="absolute bg-background backdrop-blur-sm p-4 rounded-lg shadow-sm flex flex-col items-center justify-center gap-2 z-10">
        <Loader2 className="animate-spin text-primary" />
        <div className="text-sm text-muted-foreground max-w-[300px] text-center space-y-1">
          <p className="font-medium">Generating image...</p>
          <p className="text-xs text-muted-foreground font-medium">
            This could take a while, please be patient.
          </p>
        </div>
      </div>
      <div
        className="w-full h-full flex items-center justify-center bg-no-repeat bg-contain bg-center opacity-50 blur-lg"
        style={{ backgroundImage: `url(${originalImage.url})` }}
      />
    </div>
  ) : (
    <div className="w-full h-[calc(100dvh-57px-1rem)] flex items-center justify-center">
      <img
        src={enhancedImage?.url}
        alt="Enhanced Image"
        className="max-w-full max-h-full object-contain"
      />
    </div>
  )
}

export default ImagePreview
