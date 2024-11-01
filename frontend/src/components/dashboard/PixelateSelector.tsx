import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ColorPalettes, PixelateParams } from '@/types'
import useStore from '@/store'
import { PALETTES } from '@/utils'

const PixelateSelector = () => {
  const selectedModel = useStore((state) => state.selectedModel)
  const modelParameters = useStore(
    (state) => state.modelParameters
  ) as PixelateParams

  const setModelParameters = useStore((state) => state.setModelParameters)

  if (!selectedModel) return null

  return (
    <div className="grid gap-4 bg-card text-card-foreground rounded-xl p-3">
      <h3 className="text-xs font-medium">PIXELATE</h3>
      <div className="grid gap-3">
        <div className="grid gap-2">
          <p className="text-sm">Pixelation size</p>
          <p className="text-sm text-muted-foreground">
            The larger the pixel size, the more pixelated the image will be.
          </p>
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <Slider
            min={0}
            max={60}
            defaultValue={[0]}
            value={
              modelParameters?.pixelSize ? [modelParameters.pixelSize] : [0]
            }
            onValueChange={(value) =>
              setModelParameters({ pixelSize: value[0] })
            }
          />
          <span className="text-sm text-muted-foreground border border-muted rounded-md px-2 py-1 w-10 text-right">
            {modelParameters?.pixelSize || 1}
          </span>
        </div>
      </div>
      <div className="grid gap-3">
        <p className="text-sm">Color Palette</p>
        <p className="text-sm text-muted-foreground">
          Select a color palette to apply to the image. Select 'none' to use the
          original image colors.
        </p>
        <Select
          value={modelParameters?.paletteName || ''}
          onValueChange={(value) => {
            setModelParameters({
              paletteName: value === 'none' ? '' : value,
            })
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select color palette" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">none</SelectItem>
            {Object.values(ColorPalettes).map((palette) => (
              <SelectItem key={palette} value={palette}>
                {palette}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {modelParameters?.paletteName && (
          <div className="grid grid-cols-8 gap-4 p-4 border border-muted rounded-md bg-card/50">
            {PALETTES[modelParameters.paletteName as keyof typeof PALETTES].map(
              ({ color }, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-foreground/30"
                  data-color={color}
                  data-name={color}
                  style={{ backgroundColor: color }}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PixelateSelector
