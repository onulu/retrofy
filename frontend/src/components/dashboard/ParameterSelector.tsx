import useStore from '@/store'

import DitheringSelector from './DitheringSelector'
import GlitchSelector from './GlitchSelector'
import HalftoneSelector from './HalftoneSelector'
import PixelateSelector from './PixelateSelector'

const ParameterSelector = () => {
  const selectedModel = useStore((state) => state.selectedModel)

  if (!selectedModel) return null

  return (
    <div className="self-start">
      {selectedModel === 'dithering' && <DitheringSelector />}
      {selectedModel === 'glitch' && <GlitchSelector />}
      {selectedModel === 'halftone' && <HalftoneSelector />}
      {selectedModel === 'halftone-v2' && <HalftoneSelector />}
      {selectedModel === 'pixelate' && <PixelateSelector />}
    </div>
  )
}

export default ParameterSelector
