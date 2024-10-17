import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import useStore from '@/store'
import { HalftoneParams } from '@/types'

const HalftoneSelector = () => {
  const selectedModel = useStore((state) => state.selectedModel)
  const modelParameters = useStore(
    (state) => state.modelParameters
  ) as HalftoneParams

  const setModelParameters = useStore((state) => state.setModelParameters)

  if (!selectedModel) return null

  console.log('modelParameters', modelParameters)

  return (
    <div className="grid gap-3 bg-card text-card-foreground rounded-xl p-3">
      <h3 className="text-xs font-medium">DOT OPTIONS</h3>
      <div className="grid gap-3 grid-cols-2 items-center">
        <Label htmlFor="halftone-background-color">Background Color</Label>
        <div className="flex justify-end">
          <Input
            type="color"
            className="w-16 h-10"
            value={modelParameters?.bgColor || '#ffffff'}
            onChange={(e) => setModelParameters({ bgColor: e.target.value })}
          />
        </div>
      </div>
      <div className="grid gap-3 grid-cols-2 items-center">
        <Label htmlFor="halftone-foreground-color">Color</Label>
        <div className="flex justify-end">
          <Input
            type="color"
            className="w-16 h-10"
            value={modelParameters?.color || '#000000'}
            onChange={(e) => setModelParameters({ color: e.target.value })}
          />
        </div>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="halftone-dot-size">
          Size
          <p className="text-sm text-muted-foreground mt-2">
            The square size of the halftone dots.
          </p>
        </Label>
        <Input
          type="number"
          value={modelParameters?.size || ''}
          placeholder="Please enter a value (1 - 50)"
          min={1}
          max={50}
          step={1}
          onChange={(e) => setModelParameters({ size: Number(e.target.value) })}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="halftone-dot-jump">
          Jump
          <p className="text-sm text-muted-foreground mt-2">
            The higher the value, the lower the number of dots.
          </p>
        </Label>
        <Input
          type="number"
          value={modelParameters?.jump || ''}
          placeholder="Auto"
          min={1}
          max={100}
          step={1}
          onChange={(e) => setModelParameters({ jump: Number(e.target.value) })}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="halftone-dot-ratio">
          Max Dot Size Ratio
          <p className="text-sm text-muted-foreground mt-2">
            The higher the value, the larger the dot size.
          </p>
        </Label>
        <Input
          type="number"
          value={modelParameters?.maxDotSizeRatio || 1.4}
          min={0.5}
          max={2}
          step={0.1}
          onChange={(e) =>
            setModelParameters({ maxDotSizeRatio: Number(e.target.value) })
          }
        />
      </div>
    </div>
  )
}

export default HalftoneSelector
