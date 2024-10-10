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

  const handleModelChange = (model: FilterModels) => {
    setSelectedModel(model)
  }

  return (
    <div className="grid gap-3">
      <Label htmlFor="model" className="text-md">
        Model
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
          <SelectItem value={FilterModels.LIGHTLEAKS}>
            <div className="flex items-start gap-3 text-muted-foreground">
              <div className="grid gap-0.5">
                <p className="font-medium text-foreground">Light Leaks</p>
                <p className="text-xs" data-description>
                  If you want the light leaks effect.
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
