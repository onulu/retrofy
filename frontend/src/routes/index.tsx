import EnhancementOptions from '../components/EnhancementOptions'
import ImageUpload from '../components/ImageUpload'

export default function Index() {
  const handleImageUpload = (file: File) => {
    console.log('file', file)
  }
  return (
    <div className="grid gap-2 lg:grid-cols-[minmax(360px,1fr)_2fr]">
      <EnhancementOptions onOptionsChange={(options) => console.log(options)} />
      <ImageUpload onImageUpload={handleImageUpload} />
    </div>
  )
}
