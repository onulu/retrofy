import { create } from 'zustand'
import { FilterModels } from './enum'

interface Store {
  originalImage: { file: File; url: string } | null
  enhancedImage: { blob: Blob; url: string } | null
  selectedModel: FilterModels | null
  modelParameters: Record<string, string | number>
  setOriginalImage: (image: File) => void
  setEnhancedImage: (image: Blob) => void
  setSelectedModel: (model: FilterModels) => void
  setModelParameters: (parameters: Record<string, string | number>) => void
  resetState: () => void
}

const useStore = create<Store>((set, get) => ({
  // 상태값 설정
  originalImage: null,
  enhancedImage: null,
  selectedModel: null,
  modelParameters: {},

  // 상태값 설정 함수
  setOriginalImage: (image) => {
    const { originalImage } = get()
    if (originalImage && originalImage.url) {
      URL.revokeObjectURL(originalImage.url)
    }
    const url = URL.createObjectURL(image)
    set({ originalImage: { file: image, url: url } })
  },
  setEnhancedImage: (image) => {
    const { enhancedImage } = get()
    if (enhancedImage && enhancedImage.url) {
      URL.revokeObjectURL(enhancedImage.url)
    }
    const url = URL.createObjectURL(image)
    set({ enhancedImage: { blob: image, url: url } })
  },
  setSelectedModel: (model) => {
    set({ selectedModel: model, modelParameters: {} })
  },
  setModelParameters: (parameters) => {
    set((state) => ({
      modelParameters: { ...state.modelParameters, ...parameters },
    }))
  },
  resetState: () => {
    const { originalImage, enhancedImage } = get()
    if (originalImage && originalImage.url) {
      URL.revokeObjectURL(originalImage.url)
    }
    if (enhancedImage && enhancedImage.url) {
      URL.revokeObjectURL(enhancedImage.url)
    }
    set({ originalImage: null, enhancedImage: null, selectedModel: null })
  },
}))

export default useStore
