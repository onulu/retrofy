import { useState } from 'react'

import { getEnhanceImage } from '../services/api'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import ImageUpload from './ImageUpload'
// import ImageSlider from './ImageSlider'

const beforeImage = 'https://picsum.photos/600/300'
const afterImage = 'https://picsum.photos/600/300?grayscale'

const Playground = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [options, setOptions] = useState<Record<string, number>>({})
  const [enhancedImageBlob, setEnhancedImageBlob] = useState<Blob | null>(null)

  const handleImageUpload = (file: File) => {
    console.log('file', file)
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
    <main className=" grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 h-[calc(100vh-57px)]">
      <div className="hidden flex-col items-start gap-8 md:flex overflow-scroll">
        <form className="grid w-full items-start gap-6 grid-rows-[auto_auto_1fr]">
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="font-medium text-sm">Settings</legend>
            <div className="grid gap-3">
              <Label htmlFor="filter">Filter Model</Label>
              <Select>
                <SelectTrigger id="filter" className="items-center">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dithering">Dithering</SelectItem>
                  <SelectItem value="glitch">VHS Glitch</SelectItem>
                  <SelectItem value="halftone">Halftone</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="parameter">Parameter</Label>
              <Input id="parameter" type="number" placeholder="0.1" />
            </div>
          </fieldset>
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="font-medium text-sm">Output Options</legend>
            <div className="grid gap-3">
              <Label htmlFor="size">Size</Label>
              <Input id="image_size" type="number" />
            </div>
            {/* Quality */}
            <div className="grid gap-3">
              <Label htmlFor="quality">Quality</Label>
              <Input id="image_quality" type="number" placeholder="90" />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="quality">Quality</Label>
              <Input id="image_quality" type="number" placeholder="90" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="quality">Quality</Label>
              <Input id="image_quality" type="number" placeholder="90" />
            </div>
          </fieldset>

          <div className="grid w-full">
            <Button onClick={handleEnhanceImage}>Generate</Button>
          </div>
        </form>
      </div>
      <div className="rounded-xl bg-card lg:col-span-2 flex flex-col h-full">
        <div className="w-full h-full flex justify-center items-center">
          <ImageUpload onImageUpload={handleImageUpload} />
        </div>
        {/* <ImageSlider beforeImage={beforeImage} afterImage={afterImage} /> */}
        <div className="p-4 w-full flex gap-2 justify-end">
          <Button variant="outline">Image Settings</Button>
          <Button variant="outline">Download</Button>
        </div>
      </div>
    </main>
  )
}
export default Playground
