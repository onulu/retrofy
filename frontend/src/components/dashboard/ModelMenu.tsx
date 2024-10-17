import ImageUploader from './ImageUploader'
import GenerateButton from './GenerateButton'
import ModelSelector from './ModelSelector'
import ParameterSelector from './ParameterSelector'
import CommonSelector from './CommonSelector'

const ModelMenu = () => {
  return (
    <div className="grid w-full md:h-[calc(100vh-89px)] items-start gap-3 grid-rows-[auto_1fr]">
      <h2 className="mt-4 ml-2 text-md font-medium text-foreground">
        Filter properties
      </h2>
      <div className="h-full overflow-y-auto grid grid-rows-[auto_1fr] gap-2">
        <div className="grid gap-2 items-start">
          <ImageUploader />
          <ModelSelector />
          <ParameterSelector />
          <CommonSelector />
        </div>
        <GenerateButton />
      </div>
    </div>
  )
}

export default ModelMenu
