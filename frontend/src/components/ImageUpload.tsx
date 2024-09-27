import { useCallback, useState } from 'react'
import { useDropzone, DropzoneOptions, DropzoneState } from 'react-dropzone'
import { Button } from './ui/button'
import { Upload } from 'lucide-react'

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

  const { getRootProps, getInputProps, isDragActive, open }: DropzoneState =
    useDropzone({
      onDrop,
      noClick: true,
      noKeyboard: true,
      accept: { 'image/*': [] },
      multiple: false,
    } as DropzoneOptions)

  return (
    <div
      {...getRootProps()}
      className={`relative w-full h-full flex flex-col items-center justify-center ${
        isDragActive && ' bg-blue-50/50'
      }`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div
          className="w-full flex items-center justify-center relative group hover:cursor-pointer"
          onClick={open}
        >
          <p className="text-sm absolute inset-0 bg-background/40 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            Click to change image
          </p>
          <img
            src={preview}
            alt="uploaded image preview"
            className="max-h-[70vh] object-cover transition-transform duration-300 ease-in-out"
          />
        </div>
      ) : (
        <>
          <p className="text-sm my-2">Drag and drop an image here</p>
          <Button onClick={open}>
            <Upload className="mr-2" />
            Choose image
          </Button>
        </>
      )}
    </div>
  )
}

export default ImageUpload
