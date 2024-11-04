import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import useStore from '@/store'
import { HalftoneParams } from '@/types'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const HalftoneSelector = () => {
  const selectedModel = useStore((state) => state.selectedModel)
  const modelParameters = useStore(
    (state) => state.modelParameters
  ) as HalftoneParams

  const setModelParameters = useStore((state) => state.setModelParameters)

  if (!selectedModel) return null

  return (
    <div className="grid gap-3 bg-card text-card-foreground rounded-xl p-3">
      <h3 className="text-xs font-medium">DOT OPTIONS</h3>
      <div className="grid gap-3 grid-cols-[1fr_1fr] items-center">
        <Label htmlFor="halftone-background-color">Background Color</Label>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="w-full h-10 justify-self-end rounded-lg border border-border flex items-center p-1"
              aria-label="Choose background color"
            >
              <span
                className="block w-7 h-7 rounded-tl-md rounded-bl-md border-muted border"
                style={{
                  backgroundColor: modelParameters?.bgColor || '#ffffff',
                }}
              />
              <div className="border border-muted h-7 px-2 bg-muted text-xs font-mono text-muted-foreground rounded-tr-md rounded-br-md w-full flex items-center">
                {(modelParameters?.bgColor || '#ffffff').toUpperCase()}
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-1">
            <Input
              id="halftone-background-color"
              type="color"
              className="w-20 h-20 border-none"
              value={modelParameters?.bgColor || '#ffffff'}
              onChange={(e) => setModelParameters({ bgColor: e.target.value })}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid gap-3 grid-cols-[1fr_1fr] items-center">
        <Label htmlFor="halftone-foreground-color">Dot Color</Label>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="w-full h-10 justify-self-end rounded-lg border border-border flex items-center p-1"
              aria-label="Choose dot color"
            >
              <span
                className="block w-7 h-7 rounded-tl-md rounded-bl-md border-muted border"
                style={{
                  backgroundColor: modelParameters?.color || '#000000',
                }}
              />
              <div className="border border-muted h-7 px-2 bg-muted text-xs font-mono text-muted-foreground rounded-tr-md rounded-br-md w-full flex items-center">
                {(modelParameters?.color || '#000000').toUpperCase()}
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-1">
            <Input
              id="halftone-foreground-color"
              type="color"
              className="w-20 h-20 border-none"
              value={modelParameters?.color || '#000000'}
              onChange={(e) => setModelParameters({ color: e.target.value })}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid gap-3 grid-cols-[1fr_1fr] items-center">
        <Label htmlFor="halftone-dot-size">Size</Label>
        <Input
          id="halftone-dot-size"
          type="number"
          value={modelParameters?.size || ''}
          placeholder="1 - 50"
          min={1}
          max={50}
          step={1}
          onChange={(e) => setModelParameters({ size: Number(e.target.value) })}
        />
      </div>
      <div className="grid gap-3 grid-cols-[1fr_1fr] items-center">
        <Label htmlFor="halftone-dot-jump">Jump</Label>
        <Input
          id="halftone-dot-jump"
          type="number"
          value={modelParameters?.jump || ''}
          placeholder="Auto"
          min={1}
          max={100}
          step={1}
          onChange={(e) => setModelParameters({ jump: Number(e.target.value) })}
        />
      </div>
      <div className="grid gap-3 grid-cols-[1fr_1fr] items-center">
        <Label htmlFor="halftone-dot-ratio">Max Dot Size Ratio</Label>
        <Input
          id="halftone-dot-ratio"
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
