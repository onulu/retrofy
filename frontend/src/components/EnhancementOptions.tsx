import { useState } from 'react'

interface EnhancementOption {
  id: string
  label: string
  min: number
  max: number
  step: number
  defaultValue: number
}

interface Props {
  onOptionsChange: (options: Record<string, number>) => void
}

const enhancementOptions: EnhancementOption[] = [
  {
    id: 'noise_reduction',
    label: 'Noise reduction',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 0,
  },
  {
    id: 'sharpness',
    label: 'Sharpen',
    min: -100,
    max: 100,
    step: 1,
    defaultValue: 0,
  },
  {
    id: 'brightness',
    label: 'Brightness',
    min: -100,
    max: 100,
    step: 1,
    defaultValue: 0,
  },
  {
    id: 'contrast',
    label: 'Contrast',
    min: -100,
    max: 100,
    step: 1,
    defaultValue: 0,
  },
]

const EnhancementOptions = ({ onOptionsChange }: Props) => {
  const [options, setOptions] = useState<Record<string, number>>(() =>
    enhancementOptions.reduce(
      (acc, option) => ({
        ...acc,
        [option.id]: option.defaultValue,
      }),
      {}
    )
  )

  const handleOptionChange = (id: string, value: number) => {
    const newOptions = { ...options, [id]: value }
    setOptions(newOptions)
    onOptionsChange(newOptions)
  }

  return (
    <div className="bg-zinc-900 rounded-3xl p-4">
      <fieldset className="rounded-xl border-zinc-50/50 border p-4">
        <legend className="px-1">Enhancement Options</legend>
        <div className="grid gap-4">
          {enhancementOptions.map((option) => (
            <div key={option.id} className="grid grid-cols-4 items-center">
              <label htmlFor={option.id} className="col-span-2">
                {option.label}
              </label>
              <div className="">
                <input
                  type="text"
                  value={options && options[option.id]}
                  className="rounded-lg bg-gray-700 w-12 h-10 text-center"
                  onChange={(e) =>
                    handleOptionChange(option.id, Number(e.target.value))
                  }
                />
              </div>
              <input
                type="range"
                id={option.id}
                min={option.min}
                max={option.max}
                step={option.step}
                value={options && options[option.id]}
                onChange={(e) =>
                  handleOptionChange(option.id, Number(e.target.value))
                }
                className=""
              />
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}

export default EnhancementOptions
