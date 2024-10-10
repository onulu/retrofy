import useStore from '@/store'

import DitheringSelector from './DitheringSelector'

const ParameterSelector = () => {
  const selectedModel = useStore((state) => state.selectedModel)

  if (!selectedModel) return null

  return (
    <div className="self-start">
      {selectedModel === 'dithering' && <DitheringSelector />}
      {/* {selectedModel === 'vhs_glitch' && renderVhsGlitchSelector()} */}
    </div>
  )
}

export default ParameterSelector
