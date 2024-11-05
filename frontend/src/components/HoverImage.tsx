interface ImagePreviewProps {
  src: string
  alt: string
  onClose: () => void
  isMobile: boolean
}

const HoverImage = ({ src, alt, onClose, isMobile }: ImagePreviewProps) => {
  return (
    <div className="absolute w-40 h-20 z-10 bg-white rounded-lg left-1/2 transform -translate-x-1/2 translate-y-2 -mt-2 shadow-lg">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-lg"
      />
      {isMobile && (
        <button
          className="absolute top-1 right-1 bg-gray-200 rounded-full p-1"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  )
}

export default HoverImage
