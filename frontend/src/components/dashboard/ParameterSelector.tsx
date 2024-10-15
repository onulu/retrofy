import useStore from '@/store'

import DitheringSelector from './DitheringSelector'
import GlitchSelector from './GlitchSelector'

const ParameterSelector = () => {
  const selectedModel = useStore((state) => state.selectedModel)

  if (!selectedModel) return null

  return (
    <div className="self-start">
      {selectedModel === 'dithering' && <DitheringSelector />}
      {selectedModel === 'glitch' && <GlitchSelector />}
    </div>
  )
}

export default ParameterSelector
