import ImageUploader from './ImageUploader'
import GenerateButton from './GenerateButton'
import ModelSelector from './ModelSelector'
import ParameterSelector from './ParameterSelector'
import CommonSelector from './CommonSelector'

const ModelMenu = () => {
  return (
    <div className="w-full md:h-[calc(100vh-89px)] items-start gap-3 grid h-full grid-rows-[auto_1fr] bg-muted text-muted-foreground rounded-3xl p-2 ">
      <div className="overflow-y-auto h-full grid gap-2">
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
