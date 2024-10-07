import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import useStore from '@/store'

enum DitheringTypes {
  FLOYD_STEINBERG = 'floyd-steinberg',
  BAYER = 'bayer',
  RANDOM = 'random',
}

enum ColorModes {
  GRAYSCALE = 'grayscale',
  RGB = 'rgb',
}

const DitheringSelector = () => {
  const selectedModel = useStore((state) => state.selectedModel)
  const modelParameters = useStore((state) => state.modelParameters)
  const setModelParameters = useStore((state) => state.setModelParameters)

  if (!selectedModel) return null

  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <Label htmlFor="dithering-type">Dithering Type</Label>
        <Select
          onValueChange={(value) =>
            setModelParameters({ ditheringType: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a dithering type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={DitheringTypes.FLOYD_STEINBERG}>
              Floyd-Steinberg
            </SelectItem>
            <SelectItem value={DitheringTypes.BAYER}>Bayer</SelectItem>
            <SelectItem value={DitheringTypes.RANDOM}>Random</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {modelParameters.ditheringType === DitheringTypes.FLOYD_STEINBERG && (
        <div className="grid gap-3">
          <Label htmlFor="color-mode">Color Mode</Label>
          <Select
            onValueChange={(value) => setModelParameters({ colorMode: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select color mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ColorModes.GRAYSCALE}>Grayscale</SelectItem>
              <SelectItem value={ColorModes.RGB}>Color</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      {modelParameters.ditheringType === DitheringTypes.BAYER && (
        <div className="grid gap-3">
          <Label htmlFor="dithering-threshold">Threshold</Label>
          <Input id="dithering-threshold" type="number" />
        </div>
      )}
      {modelParameters.ditheringType === DitheringTypes.RANDOM && (
        <div className="grid gap-3">
          <Label htmlFor="dithering-threshold">Threshold</Label>
          <Input id="dithering-threshold" type="number" />
        </div>
      )}
    </div>
  )
}

export default DitheringSelector
