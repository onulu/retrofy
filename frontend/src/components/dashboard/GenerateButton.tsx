import useStore from '@/store'
import { Button } from '../ui/button'

const GenerateButton = () => {
  const originalImage = useStore((state) => state.originalImage)
  const selectedModel = useStore((state) => state.selectedModel)
  const modelParameters = useStore((state) => state.modelParameters)
  const applyFilter = useStore((state) => state.applyFilter)
  const isProcessing = useStore((state) => state.isProcessing)

  const handleGenerate = async () => {
    if (!originalImage || !selectedModel) return

    try {
      await applyFilter()
    } catch (error) {
      console.error('Error generating image', error)
    }
  }

  return (
    <Button
      className="w-full self-end"
      size="lg"
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
