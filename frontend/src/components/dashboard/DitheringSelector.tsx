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
import { Slider } from '../ui/slider'

enum DitheringTypes {
  FLOYD_STEINBERG = 'floyd-steinberg',
  BAYER = 'bayer',
  RANDOM = 'random',
}

enum ColorModes {
  GRAYSCALE = 'grayscale',
  RGB = 'rgb',
}

const DEFAULT_PARAMS = {
  grayscale: {
    grayscaleLevel: 4,
  },
  rgb: {
    color_num: 2,
  },
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
          value={modelParameters.ditheringType as string}
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
        <>
          <div className="grid gap-3">
            <Label htmlFor="color-mode">Color Mode</Label>
            <Select
              onValueChange={(value) => {
                setModelParameters({
                  colorMode: value,
                  ...DEFAULT_PARAMS[value as keyof typeof DEFAULT_PARAMS],
                })
              }}
              value={modelParameters.colorMode as string}
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
          {modelParameters.colorMode === ColorModes.GRAYSCALE && (
            <div className="grid gap-6">
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <Label htmlFor="grayscale-level">Gray Scale Level</Label>
                <span className="text-sm text-muted-foreground border border-muted rounded-md px-2 py-1 w-10 text-right">
                  {modelParameters.grayscaleLevel || 4}
                </span>
              </div>
              <Slider
                id="grayscale-level"
                min={2}
                max={16}
                defaultValue={[4]}
                value={[(modelParameters.grayscaleLevel as number) || 4]}
                onValueChange={(value) =>
                  setModelParameters({ grayscaleLevel: value[0] })
                }
              />
            </div>
          )}
          {modelParameters.colorMode === ColorModes.RGB && (
            <div className="grid gap-3">
              <Label htmlFor="color-num">Color Number</Label>
              <Input id="color-num" type="number" min={2} max={16} />
            </div>
          )}
        </>
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
