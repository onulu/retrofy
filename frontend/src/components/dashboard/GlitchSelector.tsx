import { Label } from '../ui/label'
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Slider } from '../ui/slider'

const GlitchSelector = () => {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <Label htmlFor="glitch-direction">Shift Direction</Label>
        <Select
          onValueChange={(value) => {
            console.log(value)
          }}
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
        <Label htmlFor="glitch-shift-amount">Shift Amount</Label>
        <Slider
          id="glitch-shift-amount"
          min={0}
          max={20}
          step={1}
          value={[5]}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="glitch-noise-type">Noise Type</Label>
        <Select
          onValueChange={(value) => {
            console.log(value)
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
    </div>
  )
}

export default GlitchSelector
