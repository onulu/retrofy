import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

import { FilterModels } from '@/types'
import useStore from '@/store'

const modelOptions = [
  {
    label: 'Dithering',
    value: FilterModels.DITHERING,
    description: 'Blends colors with pixel patterns',
  },
  {
    label: 'Halftone',
    value: FilterModels.HALFTONE,
    description: 'Recreates images with dots of varying sizes',
  },
  {
    label: 'Pixelate',
    value: FilterModels.PIXELATE,
    description: 'Creates blocky, low-res look',
  },
  {
    label: 'VHS Glitch',
    value: FilterModels.GLITCH,
    description: 'Mimics analog tape distortion',
  },
]

const ModelSelector = () => {
  const setSelectedModel = useStore((state) => state.setSelectedModel)
  const selectedModel = useStore((state) => state.selectedModel)
  const resetModelParameters = useStore((state) => state.resetModelParameters)
  const handleModelChange = (model: FilterModels) => {
    resetModelParameters()
    setSelectedModel(model)
  }

  return (
    <div className="grid gap-4  bg-card text-card-foreground rounded-xl p-3">
      <h3 className="text-xs font-medium">FILTER</h3>
      <div className="grid gap-3">
        <Label htmlFor="model">Model Filter</Label>
        <Select onValueChange={handleModelChange} value={selectedModel ?? ''}>
          <SelectTrigger
            id="model"
            className="items-start [&_[data-description]]:hidden"
          >
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            {modelOptions.map((option) => (
              <SelectItem value={option.value} key={option.value}>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <div className="grid gap-0.5">
                    <p className="font-medium text-foreground">
                      {option.label}
                    </p>
                    <p className="text-xs" data-description>
                      {option.description}
                    </p>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default ModelSelector
