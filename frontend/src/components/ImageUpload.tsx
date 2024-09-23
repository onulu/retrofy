import { useCallback, useState } from 'react'
import { useDropzone, DropzoneOptions, DropzoneState } from 'react-dropzone'

interface ImageUploadProps {
  onImageUpload: (file: File) => void
}
const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {
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
    useDropzone({
      onDrop,
      accept: { 'image/*': [] },
      multiple: false,
    } as DropzoneOptions)

  return (
    <div
      {...getRootProps()}
      className={`rounded-3xl p-4 relative cursor-pointer h-[400px] ${
        isDragActive
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="w-full h-full">
          <img
            src={preview}
            alt="업로드된 이미지 미리보기"
            className="inset-0 h-full object-contain"
          />
        </div>
      ) : (
        <>
          <span>Click to upload an image</span> or drag and drop.
        </>
      )}
      {preview && (
        <div>
          <p className="text-white text-sm">Click to change image</p>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
