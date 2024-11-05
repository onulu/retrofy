import useStore from '@/store'
import { Button } from '../ui/button'
import {
  DitheringParams,
  FilterModels,
  GlitchParams,
  HalftoneParams,
  PixelateParams,
  HalftoneV2Params,
} from '@/types'

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

  const handleGenerate = async () => {
    if (!originalImage || !selectedModel) return

    const parameterTypeMap = {
      [FilterModels.DITHERING]: (params: unknown): params is DitheringParams =>
        true,
      [FilterModels.HALFTONE]: (params: unknown): params is HalftoneParams =>
        true,
      [FilterModels.HALFTONE_V2]: (
        params: unknown
      ): params is HalftoneV2Params => true,
      [FilterModels.PIXELATE]: (params: unknown): params is PixelateParams =>
        true,
      [FilterModels.GLITCH]: (params: unknown): params is GlitchParams => true,
    } as const

    const typeGuard = parameterTypeMap[selectedModel]

    if (!typeGuard || !typeGuard(modelParameters)) {
      setAppError('Invalid parameters detected')
      toast({
        variant: 'destructive',
        title: 'Invalid parameters detected.',
        description: 'Please check your parameters and try again.',
      })
      return
    }

    try {
      await applyFilter()
    } catch (error) {
      setAppError(`Error generating image: ${error}`)
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: 'Error generating image.',
      })
    } finally {
      setIsDrawerOpen(false)
    }
  }

  console.log('ModelParams', modelParameters)
  console.log('SelectedModel', selectedModel)

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
