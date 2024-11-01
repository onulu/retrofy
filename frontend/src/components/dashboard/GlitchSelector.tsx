import { GlitchParams } from '@/types'
import { Label } from '../ui/label'

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
    <div className="grid gap-6 bg-card text-card-foreground rounded-xl p-3">
      <h3 className="text-xs font-medium">GLITCH</h3>
      <div className="grid gap-3">
        <Label htmlFor="glitch-intensity">Intensity</Label>
        <Input
          type="number"
          min={0}
          max={1}
          step={0.1}
          value={modelParameters?.intensity || 0.5}
          onChange={(e) =>
            setModelParameters({ intensity: Number(e.target.value) })
          }
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="glitch-tracking-error">Tracking Error</Label>
        <span className="text-muted-foreground text-sm">
          The strength of vertical displacement. (0.0 - 1.0)
        </span>
        <Input
          type="number"
          min={0}
          max={1}
          step={0.1}
          value={modelParameters?.trackingError || 0.5}
          onChange={(e) =>
            setModelParameters({ trackingError: Number(e.target.value) })
          }
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="glitch-color-bleeding">Color Bleeding</Label>
        <Input
          id="glitch-color-bleeding"
          type="number"
          min={0}
          max={1}
          step={0.1}
          value={modelParameters?.colorBleeding || 0.6}
          onChange={(e) =>
            setModelParameters({ colorBleeding: Number(e.target.value) })
          }
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="glitch-color-shift">Color Shift</Label>
        <Input
          type="number"
          min={0}
          max={1}
          step={0.1}
          value={modelParameters?.colorShift || 0.5}
          onChange={(e) =>
            setModelParameters({ colorShift: Number(e.target.value) })
          }
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="glitch-noise-amount">Noise Amount</Label>
        <Input
          type="number"
          min={0}
          max={1}
          step={0.1}
          value={modelParameters?.noiseAmount || 0.15}
          onChange={(e) =>
            setModelParameters({ noiseAmount: Number(e.target.value) })
          }
        />
      </div>
    </div>
  )
}

export default GlitchSelector
