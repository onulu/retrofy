import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import useStore from '@/store'
import { HalftoneV2Params } from '@/types'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '../ui/button'

const HalftoneSelector = () => {
  const [autoSize, setAutoSize] = useState(true)

  const selectedModel = useStore((state) => state.selectedModel)
  const modelParameters = useStore(
    (state) => state.modelParameters
  ) as HalftoneV2Params

  const setModelParameters = useStore((state) => state.setModelParameters)

  if (!selectedModel) return null

  return (
    <div className="grid gap-3 bg-card text-card-foreground rounded-xl p-3">
      <h3 className="text-xs font-medium">DOT OPTIONS</h3>
      <div className="grid gap-3 grid-cols-[1fr_1fr] items-center">
        <Label asChild>
          <p>Background</p>
        </Label>
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
                  backgroundColor: modelParameters?.background || '#ffffff',
                }}
              />
              <div className="border border-muted h-7 px-2 bg-muted text-xs font-mono text-muted-foreground rounded-tr-md rounded-br-md w-full flex items-center">
                {(modelParameters?.background || '#ffffff').toUpperCase()}
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-1">
            <Input
              id="halftone-background-color"
              type="color"
              className="w-20 h-20 border-none"
              value={modelParameters?.background || '#ffffff'}
              onChange={(e) =>
                setModelParameters({ background: e.target.value })
              }
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid gap-3 grid-cols-[1fr_1fr] items-center">
        <Label asChild>
          <p>Foreground</p>
        </Label>
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
                  backgroundColor: modelParameters?.foreground || '#000000',
                }}
              />
              <div className="border border-muted h-7 px-2 bg-muted text-xs font-mono text-muted-foreground rounded-tr-md rounded-br-md w-full flex items-center">
                {(modelParameters?.foreground || '#000000').toUpperCase()}
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-1">
            <Input
              id="halftone-foreground-color"
              type="color"
              className="w-20 h-20 border-none"
              value={modelParameters?.foreground || '#000000'}
              onChange={(e) =>
                setModelParameters({ foreground: e.target.value })
              }
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid gap-3 grid-cols-[1fr_1fr] items-center">
        <Label htmlFor="halftone-dot-size">Dot Size</Label>
        <Input
          id="halftone-dot-size"
          type="number"
          value={modelParameters?.dotSize}
          defaultValue={20}
          min={1}
          max={100}
          step={1}
          onChange={(e) =>
            setModelParameters({ dotSize: Number(e.target.value) })
          }
        />
      </div>
      <div className="grid gap-3 grid-cols-[1fr_1fr] items-center">
        <div className="flex items-center justify-between gap-1">
          <Label htmlFor="halftone-dot-spacing">Dot Spacing</Label>
          <Button
            variant={autoSize ? 'primary' : 'disabled'}
            size="xs"
            className="left-1"
            onClick={() => {
              if (!autoSize) {
                setModelParameters({ dotSpacing: '' })
              } else {
                setModelParameters({
                  dotSpacing: modelParameters?.dotSize || '',
                })
              }
              setAutoSize(!autoSize)
            }}
          >
            Auto
          </Button>
        </div>
        <Input
          id="halftone-dot-spacing"
          type="number"
          disabled={autoSize}
          value={autoSize ? '' : modelParameters?.dotSpacing}
          placeholder={autoSize ? 'Auto' : ''}
          min={modelParameters?.dotSize || 1}
          max={50}
          step={1}
          onChange={(e) =>
            setModelParameters({ dotSpacing: Number(e.target.value) })
          }
        />
      </div>

      <div className="grid gap-1 grid-rows-2 items-center">
        <div className="flex items-center gap-3 justify-between">
          <Label asChild>
            <p>Min Radius</p>
          </Label>
          <Input
            type="number"
            value={modelParameters?.minRadius || 1}
            onChange={(e) =>
              setModelParameters({ minRadius: Number(e.target.value) })
            }
            min={1}
            max={50}
            className="w-16 text-sm h-8 text-left"
          />
        </div>

        <Slider
          id="halftone-min-radius"
          value={[modelParameters?.minRadius || 1]}
          min={1}
          max={50}
          step={1}
          onValueChange={(value) => setModelParameters({ minRadius: value[0] })}
          className="grid-cols-full w-full"
        />
      </div>

      <div className="grid gap-1 grid-rows-2 items-center">
        <div className="flex items-center gap-3 justify-between">
          <Label asChild>
            <p>Max Radius</p>
          </Label>
          <Input
            type="number"
            value={modelParameters?.maxRadius || 10}
            onChange={(e) =>
              setModelParameters({ maxRadius: Number(e.target.value) })
            }
            min={1}
            max={20}
            className="w-16 text-sm h-8 text-left"
          />
        </div>

        <Slider
          id="halftone-max-radius"
          value={[modelParameters?.maxRadius || 10]}
          min={1}
          max={20}
          step={1}
          onValueChange={(value) => setModelParameters({ maxRadius: value[0] })}
          className="grid-cols-full w-full"
        />
      </div>
    </div>
  )
}

export default HalftoneSelector
