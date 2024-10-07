import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import useStore from '@/store'

import { Button } from './ui/button'

const ImageUploader = () => {
  const originalImage = useStore((state) => state.originalImage)
  const setOriginalImage = useStore((state) => state.setOriginalImage)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setOriginalImage(file)
    }
  }

  return (
    <div className="grid gap-3">
      {originalImage && (
        <div className="grid gap-2">
          <h2 className="font-medium text-md">Selected Image</h2>
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
        <Label htmlFor="image-input" className="font-medium text-md">
          Select a File
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
