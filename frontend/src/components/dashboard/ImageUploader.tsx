import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import useStore from '@/store'

const ImageUploader = () => {
  const originalImage = useStore((state) => state.originalImage)
  const setOriginalImage = useStore((state) => state.setOriginalImage)
  const setEnhancedImage = useStore((state) => state.setEnhancedImage)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const maxSizeInBytes = 3 * 1024 * 1024 // 3MB

    if (file && file.size > maxSizeInBytes) {
      console.log('File size exceeds the limit of 3MB.')
      e.target.value = ''
    }
    if (file) {
      setOriginalImage(file)
      setEnhancedImage(null)
    }
  }

  return (
    <div className="grid gap-3 bg-card text-card-foreground rounded-xl p-3">
      <h2 className="font-medium text-xs mb-2">IMAGE</h2>
      {originalImage && (
        <div className="grid gap-2">
          <div className="grid grid-cols-[1fr_auto] gap-4 w-full items-center">
            <p className="text-sm text-muted-foreground">
              {originalImage.file.name}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (originalImage) {
                  document.getElementById('image-input')?.click()
                }
              }}
            >
              Change Image
            </Button>
          </div>
        </div>
      )}
      <div className={`flex flex-col gap-2 ${originalImage ? 'hidden' : ''}`}>
        <Label htmlFor="image-input" className="font-normal">
          Select a File
          <p className="text-sm text-muted-foreground mt-2">
            Image Size limit: 3MB
          </p>
        </Label>
        <Input
          id="image-input"
          type="file"
          accept="image/*"
          multiple={false}
          className="cursor-pointer"
          placeholder="Choose a file"
          onChange={handleImageChange}
        />
      </div>
    </div>
  )
}

export default ImageUploader
