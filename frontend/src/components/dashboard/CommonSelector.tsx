import useStore from '@/store'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useState } from 'react'

const CommonSelector = () => {
  const setModelParameters = useStore((state) => state.setModelParameters)
  const modelParameters = useStore((state) => state.modelParameters)

  const [autoSize, setAutoSize] = useState(true)
  return (
    <div className="grid gap-4 self-start bg-card text-card-foreground rounded-xl p-3">
      <h3 className="text-xs font-medium">IMAGE OUTPUT</h3>
      <div className="grid gap-1 grid-rows-3">
        <div className="grid gap-3 grid-cols-[1fr_1fr] items-center relative">
          <div className="flex items-center justify-between gap-1">
            <Label htmlFor="image-output-size">Size</Label>
            <Button
              variant={autoSize ? 'primary' : 'disabled'}
              size="xs"
              className="left-1"
              onClick={() => setAutoSize(!autoSize)}
            >
              Auto
            </Button>
          </div>
          <Input
            id="image-output-size"
            type="number"
            disabled={autoSize}
            min={0}
            max={1024}
            defaultValue={1024}
            value={modelParameters?.outputSize}
            onChange={(e) =>
              setModelParameters({ outputSize: parseInt(e.target.value) })
            }
          />
        </div>
        <div className="grid gap-3 grid-cols-[1fr_1fr] items-center">
          <p className="text-sm leading-none">Format</p>
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
        <div className="grid gap-3 grid-cols-[1fr_1fr] items-center">
          <Label htmlFor="image-output-quality">Quality</Label>
          <Input
            id="image-output-quality"
            type="number"
            min={1}
            max={100}
            defaultValue={95}
            value={modelParameters?.outputQuality}
            onChange={(e) =>
              setModelParameters({ outputQuality: parseInt(e.target.value) })
            }
          />
        </div>
      </div>
    </div>
  )
}

export default CommonSelector
