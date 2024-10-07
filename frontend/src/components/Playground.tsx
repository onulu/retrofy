import { useState } from 'react'

import { uploadImageForDithering } from '../services/api'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import ImageBlob from './ImageBlob'
import { Input } from './ui/input'
import { Upload } from 'lucide-react'

export interface DitheringParams {
  matrix: 2 | 4 | 8
  color: 'bw' | 'color'
}

const Playground = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const [enhancedImageBlob, setEnhancedImageBlob] = useState<Blob | null>(null)

  const [filterModel, setFilterModel] = useState<string | null>(null)

  const [ditheringParams, setDitheringParams] = useState<
    Record<string, number | string>
  >({
    matrix: 4,
    color: 'bw',
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadedImage(file)

    const reader = new FileReader()
    reader.onload = () => {
      setUploadedImageUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleEnhanceImage = async () => {
    if (!uploadedImage) return

    setEnhancedImageBlob(null)

    const enhanceMethods = {
      dithering: () => uploadImageForDithering(uploadedImage, ditheringParams),
    }

    try {
      const enhanceModel =
        enhanceMethods[filterModel as keyof typeof enhanceMethods]
      if (!enhanceModel) {
        console.error(`Unsupported filter model: ${filterModel}`)
        return
      }

      const enhancedBlob = await enhanceModel()
      setEnhancedImageBlob(enhancedBlob)
      console.log('enhancedBlob', enhancedBlob)
    } catch (err) {
      console.error('Error enhancing image', err)
    }
  }

  const onDownload = () => {
    if (!enhancedImageBlob) return
    const url = URL.createObjectURL(enhancedImageBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'enhanced.png'
    a.click()
  }

  return (
    <main className=" grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 h-[calc(100vh-57px)]">
      <div className="hidden flex-col items-start gap-8 md:flex overflow-scroll">
        <div className="grid w-full h-full items-start gap-6 grid-rows-[auto_1fr]">
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="font-medium text-sm">Upload Image</legend>
            <div className="grid gap-3">
              <Input
                id="image-input"
                type="file"
                accept="image/*"
                multiple={false}
                className="cursor-pointer"
                onChange={handleImageUpload}
              />
            </div>
          </fieldset>
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="font-medium text-sm">Settings</legend>
            <div className="grid gap-3">
              <Label htmlFor="filter">Filter Model</Label>
              <Select value={filterModel ?? ''} onValueChange={setFilterModel}>
                <SelectTrigger id="filter" className="items-center">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dithering">Dithering</SelectItem>
                  <SelectItem value="glitch">VHS Glitch</SelectItem>
                  <SelectItem value="halftone">Halftone</SelectItem>
                  <SelectItem value="noisy">Noisy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {filterModel === 'dithering' && (
              <div>
                <div className="grid gap-3">
                  <Label htmlFor="parameter">Matrix Size</Label>
                  <RadioGroup
                    className="grid grid-cols-3"
                    defaultValue={ditheringParams.matrix.toString()}
                    onValueChange={(value) =>
                      setDitheringParams({
                        ...ditheringParams,
                        matrix: Number(value) as 2 | 4 | 8,
                      })
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="option-one" />
                      <Label htmlFor="option-one">2 x 2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id="option-two" />
                      <Label htmlFor="option-two">4 x 4</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="8" id="option-three" />
                      <Label htmlFor="option-three">8 x 8</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid gap-3 mt-4">
                  <Label htmlFor="parameter">Color Shade</Label>
                  <RadioGroup
                    className="grid grid-cols-2"
                    defaultValue="bw"
                    onValueChange={(value) =>
                      setDitheringParams({
                        ...ditheringParams,
                        color: value as 'bw' | 'color',
                      })
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bw" id="option-one" />
                      <Label htmlFor="option-one">Black and White</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="color" id="option-two" />
                      <Label htmlFor="option-two">Color</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}
          </fieldset>

          <div className="grid w-full self-end">
            <Button
              onClick={handleEnhanceImage}
              disabled={!uploadedImage && !filterModel}
            >
              Generate
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-card lg:col-span-2 flex flex-col h-full">
        <div className="w-full h-full flex justify-center items-center">
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {uploadedImageUrl ? (
              <div className="w-full flex items-center justify-center relative group">
                <img
                  src={uploadedImageUrl}
                  alt="uploaded image preview"
                  className="max-h-[70vh] object-cover transition-transform duration-300 ease-in-out"
                />
              </div>
            ) : (
              <Button
                aria-label="Upload image"
                onClick={() => document.getElementById('image-input')?.click()}
              >
                <Upload className="mr-2" />
                Choose image
              </Button>
            )}
          </div>
        </div>
        {enhancedImageBlob && (
          <>
            <ImageBlob imageBlob={enhancedImageBlob} />
            <div className="p-4 w-full flex gap-2 justify-end">
              <Button variant="outline">Image Settings</Button>
              <Button variant="outline" onClick={onDownload}>
                Download
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
export default Playground
