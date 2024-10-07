import ImageUploader from '../ImageUploader'
import GenerateButton from './GenerateButton'
import ModelSelector from './ModelSelector'
import ParameterSelector from './ParameterSelector'

const ModelMenu = () => {
  return (
    <div className="grid w-full items-start gap-6 grid-rows-[auto_1fr]">
      <div className="grid gap-6 items-start">
        <ImageUploader />
        <ModelSelector />
        <ParameterSelector />
      </div>
      <GenerateButton />
    </div>
  )
}

export default ModelMenu
