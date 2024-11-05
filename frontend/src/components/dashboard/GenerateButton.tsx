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

    const parameterTypeMap = {
      [FilterModels.DITHERING]: (params: unknown): params is DitheringParams =>
        params !== null &&
        typeof params === 'object' &&
        'type' in params &&
        'colorMode' in params,
      [FilterModels.HALFTONE]: (params: unknown): params is HalftoneParams =>
        params !== null && typeof params === 'object',
      [FilterModels.HALFTONE_V2]: (
        params: unknown
      ): params is HalftoneV2Params =>
        params !== null && typeof params === 'object',
      [FilterModels.PIXELATE]: (params: unknown): params is PixelateParams =>
        params !== null && typeof params === 'object',
      [FilterModels.GLITCH]: (params: unknown): params is GlitchParams =>
        params !== null && typeof params === 'object',
    } as const

    const typeGuard = parameterTypeMap[selectedModel]

    if (!typeGuard || !typeGuard(modelParameters)) {
      handleError({
        title: 'Invalid parameters detected.',
        message:
          'Invalid parameters detected. Please check your parameters and try again.',
      })
      return
    }

    try {
      await applyFilter()
    } catch (error) {
      handleError({
        message: 'Error generating image.',
        error,
      })
    } finally {
      setIsDrawerOpen(false)
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
