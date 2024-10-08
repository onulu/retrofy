import { Button } from '@/components/ui/button'
import { uploadImageForDithering } from '@/services/api'
import useStore from '@/store'

const GenerateButton = () => {
  const originalImage = useStore((state) => state.originalImage)
  const setEnhancedImage = useStore((state) => state.setEnhancedImage)
  const selectedModel = useStore((state) => state.selectedModel)
  const modelParameters = useStore((state) => state.modelParameters)

  const handleGenerate = async () => {
    // print values from the store
    console.log('originalImage', originalImage)
    console.log('selectedModel', selectedModel)
    console.log('modelParameters', modelParameters)

    if (!originalImage) return
    try {
      const enhancedImage = await uploadImageForDithering(
        originalImage.file,
        modelParameters
      )

      setEnhancedImage(enhancedImage)

      console.log('enhancedImage', enhancedImage)
    } catch (error) {
      console.error('Error generating image', error)
    }
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
