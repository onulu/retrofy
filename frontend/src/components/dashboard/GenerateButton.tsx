import useStore from '@/store'
import { Button } from '../ui/button'
import { FilterModels } from '@/types'

import { useToast } from '@/hooks/use-toast'

const GenerateButton = () => {
  const originalImage = useStore((state) => state.originalImage)
  const selectedModel = useStore((state) => state.selectedModel)
  const modelParameters = useStore((state) => state.modelParameters)
  const applyFilter = useStore((state) => state.applyFilter)
  const isProcessing = useStore((state) => state.isProcessing)
  const setIsDrawerOpen = useStore((state) => state.setIsDrawerOpen)
  const setAppError = useStore((state) => state.setAppError)

  const { toast } = useToast()

  const handleError = ({
    title,
    message,
    error,
  }: {
    title?: string
    message: string
    error?: unknown
  }) => {
    setAppError(error ? `${message}: ${error}` : message)
    toast({
      variant: 'destructive',
      title: title ?? 'Oh no! Something went wrong.',
      description: message,
    })
  }

  const handleGenerate = async () => {
    if (!originalImage || !selectedModel) return

    if (selectedModel === FilterModels.DITHERING) {
      if (!modelParameters) {
        handleError({
          title: 'Invalid parameters detected.',
          message:
            'Invalid parameters detected. Please check your parameters and try again.',
        })
        return
      }
    }

    try {
      setIsDrawerOpen(false)
      await applyFilter()
    } catch (error) {
      handleError({
        message: 'Error generating image.',
        error,
      })
    }
  }

  return (
    <div className="space-y-4">
      <Button
        className="w-full self-end"
        size="lg"
        onClick={handleGenerate}
        disabled={!originalImage || !selectedModel || isProcessing}
      >
        {isProcessing ? 'Generating...' : 'Generate'}
      </Button>
    </div>
  )
}

export default GenerateButton
