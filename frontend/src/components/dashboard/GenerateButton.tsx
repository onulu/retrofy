import { Button } from '@/components/ui/button'
import useStore from '@/store'

const GenerateButton = () => {
  const originalImage = useStore((state) => state.originalImage)
  const selectedModel = useStore((state) => state.selectedModel)
  const modelParameters = useStore((state) => state.modelParameters)
  const applyFilter = useStore((state) => state.applyFilter)
  const isProcessing = useStore((state) => state.isProcessing)

  const handleGenerate = async () => {
    // print values from the store
    console.log('originalImage', originalImage)
    console.log('selectedModel', selectedModel)
    console.log('modelParameters', modelParameters)

    if (!originalImage || !selectedModel) return

    try {
      await applyFilter()
    } catch (error) {
      console.error('Error generating image', error)
    }
  }

  return (
    <Button
      className="self-end"
      onClick={handleGenerate}
      disabled={
        !originalImage || !selectedModel || isProcessing || !modelParameters
      }
    >
      {isProcessing ? 'Generating...' : 'Generate'}
    </Button>
  )
}

export default GenerateButton
