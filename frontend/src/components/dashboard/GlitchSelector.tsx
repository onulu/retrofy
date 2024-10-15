import { GlitchParams } from '@/types'
import { Label } from '../ui/label'
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Slider } from '../ui/slider'
import useStore from '@/store'
import { Input } from '../ui/input'

const GlitchSelector = () => {
  const selectedModel = useStore((state) => state.selectedModel)
  const modelParameters = useStore(
    (state) => state.modelParameters
  ) as GlitchParams

  const setModelParameters = useStore((state) => state.setModelParameters)

  if (!selectedModel) return null

  console.log('modelParameters', modelParameters)

  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <Label htmlFor="glitch-direction">Color Shift Direction</Label>
        <Select
          value={modelParameters?.shiftDirection || ''}
          onValueChange={(value) =>
            setModelParameters({
              shiftDirection: value as 'horizontal' | 'vertical' | 'both',
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a color shift direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="horizontal">Horizontal</SelectItem>
            <SelectItem value="vertical">Vertical</SelectItem>
            <SelectItem value="both">Both</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <Label htmlFor="glitch-shift-amount">Color Shift Amount</Label>
          <span className="text-sm text-muted-foreground border border-muted rounded-md px-2 py-1 w-10 text-right">
            {modelParameters?.shiftAmount || 15}
          </span>
        </div>
        <Slider
          id="glitch-shift-amount"
          min={1}
          max={20}
          step={1}
          defaultValue={[15]}
          value={
            modelParameters?.shiftAmount ? [modelParameters.shiftAmount] : [5]
          }
          onValueChange={(value) =>
            setModelParameters({ shiftAmount: value[0] })
          }
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="glitch-noise-type">Noise Type</Label>
        <Select
          value={modelParameters?.noiseType || 'gaussian'}
          onValueChange={(value) => {
            setModelParameters({ noiseType: value })
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a noise type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gaussian">Gaussian</SelectItem>
            <SelectItem value="salt_pepper">Salt & Pepper</SelectItem>
            <SelectItem value="speckle">Speckle</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="glitch-noise-strength">Noise Strength</Label>
        <Input
          type="number"
          value={modelParameters?.noiseStrength || 0.1}
          min={0}
          max={1}
          step={0.1}
          onChange={(e) =>
            setModelParameters({ noiseStrength: Number(e.target.value) })
          }
        />
      </div>
    </div>
  )
}

export default GlitchSelector
