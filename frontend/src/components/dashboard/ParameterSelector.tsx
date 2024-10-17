import useStore from '@/store'

import DitheringSelector from './DitheringSelector'
import GlitchSelector from './GlitchSelector'
import HalftoneSelector from './HalftoneSelector'

const ParameterSelector = () => {
  const selectedModel = useStore((state) => state.selectedModel)

  if (!selectedModel) return null

  return (
    <div className="self-start">
      {selectedModel === 'dithering' && <DitheringSelector />}
      {selectedModel === 'glitch' && <GlitchSelector />}
      {selectedModel === 'halftone' && <HalftoneSelector />}
    </div>
  )
}

export default ParameterSelector
