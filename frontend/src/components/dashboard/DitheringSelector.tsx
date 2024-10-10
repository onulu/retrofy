import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

import useStore from '@/store'
import { Slider } from '../ui/slider'
import { DitheringParams, ColorPalettes } from '@/types'
import { PALETTES } from '@/utils'

const DEFAULT_PARAMS = {
  grayscale: {
    grayscaleLevel: 4,
  },
  rgb: {
    paletteName: 'zx_spectrum',
  },
}

const DitheringSelector = () => {
  const selectedModel = useStore((state) => state.selectedModel)
  const modelParameters = useStore(
    (state) => state.modelParameters
  ) as DitheringParams
  const setModelParameters = useStore((state) => state.setModelParameters)

  if (!selectedModel) return null

  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <Label htmlFor="dithering-type">Dithering Type</Label>
        <Select
          onValueChange={(value) => {
            setModelParameters({ type: value })
            // reset params
            setModelParameters({
              colorMode: 'grayscale',
              grayscaleLevel: 4,
            })
          }}
          value={modelParameters.type}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a dithering type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="floyd_steinberg">Floyd-Steinberg</SelectItem>
            <SelectItem value="bayer">Bayer</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
              <SelectItem value="grayscale">Grayscale</SelectItem>
              <SelectItem value="rgb">Color</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {modelParameters.colorMode === 'grayscale' && (
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
        {modelParameters.colorMode === 'rgb' && (
          <div className="grid gap-3">
            <Label htmlFor="palette-name">Color Palette</Label>
            <Select
              onValueChange={(value) => {
                setModelParameters({
                  paletteName: value,
                })
              }}
              value={modelParameters.paletteName as string}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select color palette" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ColorPalettes).map((palette) => (
                  <SelectItem key={palette} value={palette}>
                    {palette}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="grid grid-cols-8 gap-4 p-4 border border-muted rounded-md">
              {PALETTES[
                modelParameters.paletteName as keyof typeof PALETTES
              ].map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-white/20"
                  data-color={color.color}
                  data-name={color.name}
                  style={{ backgroundColor: color.color }}
                />
              ))}
            </div>
          </div>
        )}
      </>

      {modelParameters.type === 'bayer' && (
        <div className="grid gap-3">
          <Label htmlFor="matrix-size">Matrix Size</Label>
          <Select
            onValueChange={(value) => {
              setModelParameters({ matrixSize: value })
            }}
            value={modelParameters.matrixSize?.toString() ?? '4'}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select matrix size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2x2</SelectItem>
              <SelectItem value="4">4x4</SelectItem>
              <SelectItem value="8">8x8</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}

export default DitheringSelector
