import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'

type Props = {
  beforeImage: string
  afterImage: string
}

const ImageSlider = ({ beforeImage, afterImage }: Props) => {
  const [sliderValue, setSliderValue] = useState<number>(50)
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value))
  }

  return (
    <div className="relative w-full mx-auto">
      <div className="relative w-full">
        <img
          src={beforeImage}
          alt="before image"
          className="block w-full h-full max-w-full object-cover object-center"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${sliderValue}%)` }}
        >
          <img
            src={afterImage}
            alt="after image"
            className="block w-full h-full max-w-full object-cover object-center"
          />
        </div>
        <div
          className="absolute w-full"
          style={{
            transform: `translateX(${sliderValue}%)`,
          }}
        >
          <ArrowLeft size={32} />
          <ArrowRight size={32} />
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={sliderValue}
        onChange={handleSliderChange}
        className="cursor-pointer"
      />
    </div>
  )
}

export default ImageSlider
