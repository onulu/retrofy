import ImageUpload from '../components/ImageUpload'

export default function Index() {
  const handleImageUpload = (file: File) => {
    console.log('file', file)
  }
  return (
    <div className="flex justify-center items-center h-full">
      <ImageUpload onImageUpload={handleImageUpload} />
    </div>
  )
}
