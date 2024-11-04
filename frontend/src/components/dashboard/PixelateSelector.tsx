import { Slider } from '@/components/ui/slider'
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
import { Button } from '../ui/button'

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
      <div className="grid grid-rows-2 items-center">
        <div className="grid gap-2 grid-cols-[auto_auto] items-center justify-between">
          <p className="text-sm">Size</p>
          <span className="text-sm text-muted-foreground border border-transparent hover:border-muted rounded-md px-2 py-1 w-10 text-right">
            {modelParameters?.pixelSize || 1}
          </span>
        </div>
        <Slider
          title="Pixel Size"
          min={0}
          max={60}
          defaultValue={[0]}
          value={modelParameters?.pixelSize ? [modelParameters.pixelSize] : [0]}
          onValueChange={(value) => setModelParameters({ pixelSize: value[0] })}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
        />
      </div>
      <div className="grid gap-3 grid-rows-[auto_1fr] items-center">
        <div className="flex items-center gap-2 justify-between">
          <p className="text-sm">Color Palette</p>
          <Button variant="primary" size="xs" onClick={() => {}}>
            Auto
          </Button>
        </div>
        <Select
          value={modelParameters?.paletteName || ''}
          onValueChange={(value) => {
            setModelParameters({
              paletteName: value === 'Auto' ? '' : value,
            })
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Preset" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Auto">Auto</SelectItem>
            {Object.values(ColorPalettes).map((palette) => (
              <SelectItem key={palette} value={palette}>
                {palette}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {modelParameters?.paletteName && (
          <div className="col-span-full grid grid-cols-8 gap-4 p-4 border border-muted rounded-md bg-card/50">
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
