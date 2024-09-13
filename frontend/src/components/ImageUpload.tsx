import { useCallback, useState } from 'react'
import { useDropzone, DropzoneOptions, DropzoneState } from 'react-dropzone'

interface ImageUploadProps {
  onImageUpload: (file: File) => void
}
export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        onImageUpload(file)

        const reader = new FileReader()
        reader.onload = (e: ProgressEvent<FileReader>) => {
          setPreview(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      }
    },
    [onImageUpload]
  )

  const { getRootProps, getInputProps, isDragActive }: DropzoneState =
    // @ts-expect-error: ts(2352) lint asking for optional props.
    useDropzone({
      onDrop,
      accept: { 'image/*': [] },
      multiple: false,
    } as DropzoneOptions)

  return (
    <>
      <div
        {...getRootProps()}
        className={`relative flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        {/* @ts-expect-error: ts(2559) the library definition is wrong. */}
        <input {...getInputProps()} />
        {preview ? (
          <div className="mt-6">
            <img
              src={preview}
              alt="업로드된 이미지 미리보기"
              className="absolute inset-0 w-full h-full rounded-lg shadow-lg object-contain"
            />
          </div>
        ) : (
          <>
            <span>클릭하여 업로드</span> 또는 드래그 앤 드롭하세요.
            <p>(최대 10MB)</p>
          </>
        )}
        {preview && (
          <div className="absolute bottom-0 w-full bg-black bg-opacity-50 flex items-center justify-center h-14">
            <p className="text-white text-sm">클릭하여 이미지 변경</p>
          </div>
        )}
      </div>
    </>
  )
}
