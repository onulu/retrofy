import { GlitchParams } from '@/types'

import useStore from '@/store'
import { Slider } from '../ui/slider'

const GlitchSelector = () => {
  const selectedModel = useStore((state) => state.selectedModel)
  const modelParameters = useStore(
    (state) => state.modelParameters
  ) as GlitchParams

  const setModelParameters = useStore((state) => state.setModelParameters)

  if (!selectedModel) return null

  console.log('modelParameters', modelParameters)

  return (
    <div className="grid gap-3 bg-card text-card-foreground rounded-xl p-3">
      <h3 className="text-xs font-medium">GLITCH</h3>
      <div className="grid grid-rows-2 items-center">
        <div className="grid gap-2 grid-cols-[auto_auto] items-center justify-between">
          <p className="text-sm">Intensity</p>
          <span className="text-sm text-muted-foreground border border-transparent hover:border-muted rounded-md px-2 py-1 w-10 text-right">
            {modelParameters?.intensity || 0.5}
          </span>
        </div>
        <Slider
          id="glitch-intensity"
          min={0}
          max={10}
          step={0.1}
          value={[modelParameters?.intensity || 0.5]}
          onValueChange={([value]) => setModelParameters({ intensity: value })}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
        />
      </div>
      <div className="grid grid-rows-2 items-center">
        <div className="grid gap-2 grid-cols-[auto_auto] items-center justify-between">
          <p className="text-sm">Tracking Error</p>
          <span className="text-sm text-muted-foreground border border-transparent hover:border-muted rounded-md px-2 py-1 w-10 text-right">
            {modelParameters?.trackingError || 0.5}
          </span>
        </div>
        <Slider
          id="glitch-tracking-error"
          min={0}
          max={1}
          step={0.1}
          value={[modelParameters?.trackingError || 0.5]}
          onValueChange={([value]) =>
            setModelParameters({ trackingError: value })
          }
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
        />
      </div>
      <div className="grid grid-rows-2 items-center">
        <div className="grid gap-2 grid-cols-[auto_auto] items-center justify-between">
          <p className="text-sm">Color Bleeding</p>
          <span className="text-sm text-muted-foreground border border-transparent hover:border-muted rounded-md px-2 py-1 w-10 text-right">
            {modelParameters?.colorBleeding || 0.6}
          </span>
        </div>
        <Slider
          id="glitch-color-bleeding"
          min={0}
          max={1}
          step={0.1}
          value={[modelParameters?.colorBleeding || 0.6]}
          onValueChange={([value]) =>
            setModelParameters({ colorBleeding: value })
          }
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
        />
      </div>
      <div className="grid grid-rows-2 items-center">
        <div className="grid gap-2 grid-cols-[auto_auto] items-center justify-between">
          <p className="text-sm">Color Shift</p>
          <span className="text-sm text-muted-foreground border border-transparent hover:border-muted rounded-md px-2 py-1 w-10 text-right">
            {modelParameters?.colorShift || 0.5}
          </span>
        </div>
        <Slider
          id="glitch-color-shift"
          min={0}
          max={1}
          step={0.1}
          value={[modelParameters?.colorShift || 0.5]}
          onValueChange={([value]) => setModelParameters({ colorShift: value })}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
        />
      </div>
      <div className="grid grid-rows-2 items-center">
        <div className="grid gap-2 grid-cols-[auto_auto] items-center justify-between">
          <p className="text-sm">Noise Amount</p>
          <span className="text-sm text-muted-foreground border border-transparent hover:border-muted rounded-md px-2 py-1 w-10 text-right">
            {modelParameters?.noiseAmount || 0.15}
          </span>
        </div>
        <Slider
          id="glitch-noise-amount"
          min={0}
          max={1}
          step={0.1}
          value={[modelParameters?.noiseAmount || 0.15]}
          onValueChange={([value]) =>
            setModelParameters({ noiseAmount: value })
          }
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
        />
      </div>
    </div>
  )
}

export default GlitchSelector
