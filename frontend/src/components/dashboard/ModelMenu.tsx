import ImageUploader from './ImageUploader'
import GenerateButton from './GenerateButton'
import ModelSelector from './ModelSelector'
import ParameterSelector from './ParameterSelector'
import CommonSelector from './CommonSelector'

const ModelMenu = () => {
  return (
    <div className="p-2 md:p-4 grid w-full h-[calc(100vh-7rem)] overflow-y-auto items-start gap-6 grid-rows-[auto_1fr]">
      <div className="grid gap-6 items-start">
        <ImageUploader />
        <ModelSelector />
        <ParameterSelector />
      </div>
      <CommonSelector />
      <GenerateButton />
    </div>
  )
}

export default ModelMenu
