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

const DitheringSelector = () => {
  const selectedModel = useStore((state) => state.selectedModel)
  const modelParameters = useStore(
    (state) => state.modelParameters
  ) as DitheringParams
  const resetModelParameters = useStore((state) => state.resetModelParameters)
  const setModelParameters = useStore((state) => state.setModelParameters)

  if (!selectedModel) return null

  console.log('modelParameters', modelParameters)

  return (
    <div className="grid gap-4 bg-card text-card-foreground rounded-xl p-3">
      <h3 className="text-xs font-medium">DITHERING</h3>
      <div className="grid gap-3">
        <Label htmlFor="dithering-type">Type</Label>
        <Select
          onValueChange={(value) => {
            resetModelParameters()
            setModelParameters({ type: value })
          }}
          value={modelParameters?.type || ''}
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

      <div className="grid gap-3">
        <Label htmlFor="color-mode">Color Mode</Label>
        <Select
          value={modelParameters?.colorMode || ''}
          onValueChange={(value) => {
            setModelParameters({
              colorMode: value,
            })
          }}
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
      {modelParameters?.colorMode === 'grayscale' &&
        modelParameters?.type === 'floyd_steinberg' && (
          <div className="grid gap-6">
            <div className="grid grid-cols-[1fr_auto] gap-2">
              <Label htmlFor="grayscale-level">Gray Scale Level</Label>
              <span className="text-sm text-muted-foreground border border-muted rounded-md px-2 py-1 w-10 text-right">
                {modelParameters?.grayscaleLevel || 4}
              </span>
            </div>
            <Slider
              id="grayscale-level"
              min={2}
              max={8}
              defaultValue={[4]}
              value={
                modelParameters?.grayscaleLevel
                  ? [modelParameters.grayscaleLevel]
                  : [4]
              }
              onValueChange={(value) =>
                setModelParameters({ grayscaleLevel: value[0] })
              }
            />
          </div>
        )}
      {modelParameters?.colorMode === 'rgb' && (
        <div className="grid gap-3">
          <Label htmlFor="palette-name">Color Palette</Label>
          <Select
            value={modelParameters?.paletteName || ''}
            onValueChange={(value) => {
              setModelParameters({
                paletteName: value,
              })
            }}
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
          {modelParameters?.paletteName && (
            <div className="grid grid-cols-8 gap-4 p-4 border border-muted rounded-md bg-card/50">
              {PALETTES[
                modelParameters.paletteName as keyof typeof PALETTES
              ].map(({ color }, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-foreground/30"
                  data-color={color}
                  data-name={color}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {modelParameters?.type === 'bayer' && (
        <div className="grid gap-3">
          <Label htmlFor="matrix-size">Matrix Size</Label>
          <Select
            value={
              modelParameters?.matrixSize
                ? '' + modelParameters.matrixSize
                : '2'
            }
            onValueChange={(value) => {
              setModelParameters({ matrixSize: Number(value) })
            }}
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
      <div className="grid gap-3">
        <div className="grid gap-2">
          <Label htmlFor="pixelation-size">Pixelation Size</Label>
          <p className="text-sm text-muted-foreground">
            If you want to pixelate the image, set the pixel size to a value
            greater than 0. It works best with the floyd-steinberg dithering.
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-2">
          <Slider
            id="pixelation-size"
            min={0}
            max={10}
            defaultValue={[0]}
            value={
              modelParameters?.pixelSize ? [modelParameters.pixelSize] : [0]
            }
            onValueChange={(value) =>
              setModelParameters({ pixelSize: value[0] })
            }
          />
          <span className="text-sm text-muted-foreground border border-muted rounded-md px-2 py-1 w-10 text-right">
            {modelParameters?.pixelSize || 0}
          </span>
        </div>
      </div>
    </div>
  )
}

export default DitheringSelector
