import { create } from 'zustand'
import { applyFilterLogic } from './services/api'
import { FilterModels, FilterParams } from './types'

interface Store {
  originalImage: { file: File; url: string } | null
  enhancedImage: { blob: Blob; url: string } | null
  selectedModel: FilterModels | null
  modelParameters: FilterParams | null
  isProcessing: boolean
  appError: string | null
  applyFilter: () => Promise<void>
  setOriginalImage: (image: File) => void
  setEnhancedImage: (image: Blob | null) => void
  setSelectedModel: (model: FilterModels) => void
  setModelParameters: (parameters: Record<string, number | string>) => void
  setProcessing: (isProcessing: boolean) => void
  setAppError: (error: string) => void
  resetState: () => void
  resetModelParameters: () => void
}

const useStore = create<Store>((set, get) => ({
  // 상태값 설정
  originalImage: null,
  enhancedImage: null,
  selectedModel: null,
  modelParameters: null,
  commonParameters: null,
  isProcessing: false,
  appError: null,

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
    if (image) {
      const url = URL.createObjectURL(image)
      set({ enhancedImage: { blob: image, url: url } })
    } else {
      set({ enhancedImage: null })
    }
  },
  setSelectedModel: (model) => {
    set({ selectedModel: model })
  },
  setModelParameters: (parameters) => {
    set((state) => ({
      modelParameters: {
        ...state.modelParameters,
        ...parameters,
      } as FilterParams,
    }))
  },
  setProcessing: (isProcessing) => set({ isProcessing }),
  setAppError: (error) => set({ appError: error }),
  resetModelParameters: () => {
    set({ modelParameters: null })
  },
  resetState: () => {
    const { originalImage, enhancedImage } = get()
    if (originalImage && originalImage.url) {
      URL.revokeObjectURL(originalImage.url)
    }
    if (enhancedImage && enhancedImage.url) {
      URL.revokeObjectURL(enhancedImage.url)
    }
    set({
      originalImage: null,
      enhancedImage: null,
      selectedModel: null,
      modelParameters: null,
      isProcessing: false,
      appError: null,
    })
  },
  applyFilter: async () => {
    const { selectedModel, modelParameters, originalImage } =
      useStore.getState()
    if (!originalImage?.file || !selectedModel || !modelParameters) {
      set({ appError: '원본이미지와 필터모델을 먼저 선택해주세요.' })
      return
    }

    set({ isProcessing: true, appError: null })

    try {
      const image = await applyFilterLogic(
        originalImage.file,
        selectedModel,
        modelParameters as FilterParams
      )
      const { enhancedImage } = get()
      if (enhancedImage?.url) {
        URL.revokeObjectURL(enhancedImage.url)
      }
      const url = URL.createObjectURL(image)
      set({ enhancedImage: { blob: image, url: url }, isProcessing: false })
    } catch (error) {
      set({
        appError:
          error instanceof Error
            ? error.message
            : '알수없는 에러가 발생했습니다.',
        isProcessing: false,
      })
    }
  },
}))

export default useStore
