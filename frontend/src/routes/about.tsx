import { useState, useEffect } from 'react'
import ImagePreview from '../components/ImagePreview'

export default function About() {
  const [isImageVisible, setIsImageVisible] = useState(false)
  const [isSuperCoolImageVisible, setIsSuperCoolImageVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
  }, [])

  const toggleImage = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter((prev) => !prev)
  }

  return (
    <main className="m-4 h-full rounded-3xl bg-muted p-4">
      <div className="h-full items-center justify-center max-w-screen-sm mx-auto flex flex-col gap-8">
        <div className="space-y-2 relative">
          <h3 className="text-secondary-foreground">Retrofy</h3>

          <p className="text-muted-foreground">
            Retrofy is a (fun) personal project that transforms{' '}
            <em
              className="underline relative inline-block cursor-pointer"
              onMouseEnter={() => !isMobile && setIsImageVisible(true)}
              onMouseLeave={() => !isMobile && setIsImageVisible(false)}
              onClick={() => toggleImage(setIsImageVisible)}
            >
              normal images
              {isImageVisible && (
                <ImagePreview
                  src="src/assets/bt.jpg"
                  alt="Retrofy preview"
                  onClose={() => setIsImageVisible(false)}
                  isMobile={isMobile}
                />
              )}
            </em>{' '}
            into old-school retro style{' '}
            <em
              className="underline relative inline-block cursor-pointer"
              onMouseEnter={() => !isMobile && setIsSuperCoolImageVisible(true)}
              onMouseLeave={() =>
                !isMobile && setIsSuperCoolImageVisible(false)
              }
              onClick={() => toggleImage(setIsSuperCoolImageVisible)}
            >
              super cool images
              {isSuperCoolImageVisible && (
                <ImagePreview
                  src="src/assets/super-cool.jpg"
                  alt="Super cool image preview"
                  onClose={() => setIsSuperCoolImageVisible(false)}
                  isMobile={isMobile}
                />
              )}
            </em>{' '}
            using OpenCV technology.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-secondary-foreground">About</h3>
          <p className="text-muted-foreground">
            While exploring machine learning and computer vision technologies, I
            discovered how OpenCV's image processing capabilities could be
            creatively repurposed. What began as an investigation into noise
            reduction algorithms led to an interesting realization: digital
            manipulation techniques could authentically recreate various retro
            visual aesthetics - from vintage displays to print patterns. This
            project synthesizes classical dithering algorithms with modern image
            processing techniques, pushing the boundaries of what's possible
            with OpenCV. Looking ahead, I plan to integrate deep learning models
            to further enhance the creative possibilities of retro image
            transformation.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-secondary-foreground">Contact</h3>
          <p className="text-muted-foreground">
            If you have any questions or feedback, please feel free to contact
            me via email at{' '}
            <a
              href="mailto:hi.onulu@gmail.com"
              className="underline hover:text-primary"
            >
              hi.onulu@gmail.com
            </a>
            and visit the repo on{' '}
            <a
              href="https://github.com/onulu/retrofy"
              className="underline hover:text-primary"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  )
}
