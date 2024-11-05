import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

import useStore from '@/store'
import { DitheringParams, ColorPalettes } from '@/types'
import { PALETTES } from '@/utils'
import { Button } from '../ui/button'
import { useState } from 'react'

const DitheringSelector = () => {
  const [autoPalette, setAutoPalette] = useState(false)

  const selectedModel = useStore((state) => state.selectedModel)
  const modelParameters = useStore(
    (state) => state.modelParameters
  ) as DitheringParams
  const resetModelParameters = useStore((state) => state.resetModelParameters)
  const setModelParameters = useStore((state) => state.setModelParameters)

  if (!selectedModel) return null

  return (
    <div className="grid gap-4 bg-card text-card-foreground rounded-xl p-3">
      <h3 className="text-xs font-medium">DITHERING</h3>
      <div className="grid gap-3 grid-cols-1 lg:grid-cols-[1fr_2fr] items-center">
        <Label htmlFor="dithering-type">Type</Label>
        <Select
          onValueChange={(value) => {
            resetModelParameters()
            setModelParameters({ type: value })
          }}
          value={modelParameters?.type || ''}
        >
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent id="dithering-type">
            <SelectItem value="floyd_steinberg">Floyd-Steinberg</SelectItem>
            <SelectItem value="bayer">Bayer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {modelParameters?.type === 'bayer' && (
        <div className="grid gap-3 grid-cols-1 lg:grid-cols-[1fr_2fr] items-center">
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
            defaultValue="2"
          >
            <SelectTrigger>
              <SelectValue placeholder="Matrix size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2x2</SelectItem>
              <SelectItem value="4">4x4</SelectItem>
              <SelectItem value="8">8x8</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      <div className="grid gap-3 grid-cols-1 lg:grid-cols-[1fr_2fr] items-center">
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
            <SelectValue placeholder="Color mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="grayscale">Grayscale</SelectItem>
            <SelectItem value="rgb">Color</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {modelParameters?.colorMode === 'rgb' && (
        <div className="grid gap-3 grid-cols-1 lg:grid-cols-[1fr_2fr] items-center justify-center">
          <div className="flex items-center justify-between gap-1">
            <Label htmlFor="palette-name">Palette</Label>
            <Button
              variant={autoPalette ? 'primary' : 'disabled'}
              size="xs"
              onClick={() => {
                setAutoPalette(!autoPalette)
                setModelParameters({
                  paletteName: '',
                })
              }}
            >
              Auto
            </Button>
          </div>
          <Select
            value={autoPalette ? '' : modelParameters?.paletteName || ''}
            disabled={autoPalette}
            onValueChange={(value) => {
              setModelParameters({
                paletteName: value,
              })
            }}
            defaultValue=""
          >
            <SelectTrigger>
              <SelectValue placeholder="Preset" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ColorPalettes).map((palette) => (
                <SelectItem key={palette} value={palette}>
                  {palette}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!autoPalette && modelParameters?.paletteName && (
            <div className="col-span-full grid grid-cols-8 gap-4 p-4 border border-muted rounded-md bg-card/50">
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
    </div>
  )
}

export default DitheringSelector
