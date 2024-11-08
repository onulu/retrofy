import ImageUploader from './ImageUploader'
import GenerateButton from './GenerateButton'
import ModelSelector from './ModelSelector'
import ParameterSelector from './ParameterSelector'
import CommonSelector from './CommonSelector'

const ModelMenu = () => {
  return (
    <div className="h-[calc(100dvh-57px-1rem)] overflow-y-auto w-full items-start gap-3 grid grid-rows-[auto_1fr] text-muted-foreground pb-2">
      <div className="md:overflow-y-auto h-full grid gap-2">
        <h2 className="mt-4 ml-2 text-md font-medium text-foreground">
          Filter properties
        </h2>
        <div className="grid gap-2">
          <ImageUploader />
          <ModelSelector />
          <ParameterSelector />
          <CommonSelector />
        </div>
      </div>
      <GenerateButton />
    </div>
  )
}

export default ModelMenu
