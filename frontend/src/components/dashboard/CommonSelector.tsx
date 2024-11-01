import useStore from '@/store'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const CommonSelector = () => {
  const setModelParameters = useStore((state) => state.setModelParameters)
  const modelParameters = useStore((state) => state.modelParameters)

  return (
    <div className="grid gap-4 self-start bg-card text-card-foreground rounded-xl p-3">
      <h3 className="text-xs font-medium">IMAGE OUTPUT</h3>
      <div className="grid gap-3">
        <Label htmlFor="image-output-size">Image Size</Label>
        <Input
          id="image-output-size"
          type="number"
          min={100}
          max={1024}
          step={1}
          value={modelParameters?.outputSize || 640}
          onChange={(e) =>
            setModelParameters({ outputSize: parseInt(e.target.value) })
          }
        />
      </div>
      <div className="grid gap-3">
        <p className="text-sm">Image Format</p>
        <Select
          value={modelParameters?.outputFormat || 'jpeg'}
          onValueChange={(value) =>
            setModelParameters({ outputFormat: value as 'png' | 'jpeg' })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select output format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jpeg">JPEG</SelectItem>
            <SelectItem value="png">PNG</SelectItem>
            <SelectItem value="webp">WEBP</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="image-output-quality">Image Quality</Label>
        <Input
          id="image-output-quality"
          type="number"
          min={1}
          max={100}
          step={1}
          value={modelParameters?.outputQuality || 95}
          onChange={(e) =>
            setModelParameters({ outputQuality: parseInt(e.target.value) })
          }
        />
      </div>
    </div>
  )
}

export default CommonSelector
