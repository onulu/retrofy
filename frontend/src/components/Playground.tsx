import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const Playground = () => {
  return (
    <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="hidden flex-col items-start gap-8 md:flex">
        <form className="grid w-full items-start gap-6 h-full grid-rows-[auto_auto_1fr]">
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="font-medium text-sm">Settings</legend>
            <div className="grid gap-3">
              <Label htmlFor="filter">Filter</Label>
              <Select>
                <SelectTrigger id="filter" className="items-center">
                  <SelectValue placeholder="Select a filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dithering">Dithering</SelectItem>
                  <SelectItem value="glitch">VHS Glitch</SelectItem>
                  <SelectItem value="halftone">Halftone</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="parameter">Parameter</Label>
              <Input id="parameter" type="number" placeholder="0.1" />
            </div>
          </fieldset>
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="font-medium text-sm">Output Options</legend>
            <div className="grid gap-3">
              <Label htmlFor="size">Size</Label>
              <Input id="image_size" type="number" />
            </div>
            {/* Quality */}
            <div className="grid gap-3">
              <Label htmlFor="quality">Quality</Label>
              <Input id="image_quality" type="number" placeholder="90" />
            </div>
          </fieldset>

          <div className="grid w-full self-end">
            <Button>Generate</Button>
          </div>
        </form>
      </div>
      <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
        Preview
      </div>
    </main>
  )
}
export default Playground
