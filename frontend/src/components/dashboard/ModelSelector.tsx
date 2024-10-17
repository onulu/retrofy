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

const ModelSelector = () => {
  const setSelectedModel = useStore((state) => state.setSelectedModel)
  const selectedModel = useStore((state) => state.selectedModel)
  const resetModelParameters = useStore((state) => state.resetModelParameters)
  const handleModelChange = (model: FilterModels) => {
    resetModelParameters()
    setSelectedModel(model)
  }

  return (
    <div className="grid gap-3 bg-card text-card-foreground rounded-xl p-3">
      <h3 className="text-xs font-medium mb-2">FILTER</h3>
      <Label htmlFor="model">
        Model Filter
        <p className="text-sm text-muted-foreground mt-2">
          Select a filter model to apply to your image.
        </p>
      </Label>
      <Select onValueChange={handleModelChange} value={selectedModel ?? ''}>
        <SelectTrigger
          id="model"
          className="items-start [&_[data-description]]:hidden"
        >
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={FilterModels.DITHERING}>
            <div className="flex items-start gap-3 text-muted-foreground">
              <div className="grid gap-0.5">
                <p className="font-medium text-foreground">Dithering</p>
                <p className="text-xs" data-description>
                  If you want to make your image look like it's from the 1980s.
                </p>
              </div>
            </div>
          </SelectItem>
          <SelectItem value={FilterModels.GLITCH}>
            <div className="flex items-start gap-3 text-muted-foreground">
              <div className="grid gap-0.5">
                <p className="font-medium text-foreground">VHS Glitch</p>
                <p className="text-xs" data-description>
                  If you want the vhs tape effect.
                </p>
              </div>
            </div>
          </SelectItem>
          <SelectItem value={FilterModels.HALFTONE}>
            <div className="flex items-start gap-3 text-muted-foreground">
              <div className="grid gap-0.5">
                <p className="font-medium text-foreground">Halftone</p>
                <p className="text-xs" data-description>
                  If you want the halftone effect.
                </p>
              </div>
            </div>
          </SelectItem>
          <SelectItem value={FilterModels.VIGNETTING}>
            <div className="flex items-start gap-3 text-muted-foreground">
              <div className="grid gap-0.5">
                <p className="font-medium text-foreground">Vignetting</p>
                <p className="text-xs" data-description>
                  If you want the vignetting effect.
                </p>
              </div>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default ModelSelector
