import { useEffect, useState } from 'react'

const ImageBlob = ({ imageBlob }: { imageBlob: Blob }) => {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (imageBlob) {
      const url = URL.createObjectURL(imageBlob)
      setImageUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [imageBlob])
  return (
    <div>
      <img
        src={imageUrl}
        alt="Enhanced image"
        className="h-auto w-full"
        loading="lazy"
      />
    </div>
  )
}

export default ImageBlob
