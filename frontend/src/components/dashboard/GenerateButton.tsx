import { Button } from '@/components/ui/button'
import useStore from '@/store'

const GenerateButton = () => {
  const originalImage = useStore((state) => state.originalImage)
  const selectedModel = useStore((state) => state.selectedModel)
  const modelParameters = useStore((state) => state.modelParameters)

  const handleGenerate = () => {
    // print values from the store
    console.log('originalImage', originalImage)
    console.log('selectedModel', selectedModel)
    console.log('modelParameters', modelParameters)
  }

  return (
    <Button
      className="self-end"
      onClick={handleGenerate}
      disabled={!originalImage || !selectedModel}
    >
      Generate
    </Button>
  )
}

export default GenerateButton
