export default function About() {
  return (
    <main className="mx-4 rounded-3xl bg-muted p-4 h-[calc(100dvh-57px-1rem)]">
      <div className="items-center justify-center max-w-screen-sm mx-auto px-4 md:px-0 flex flex-col gap-8 h-full overflow-y-auto">
        <div className="space-y-2 relative">
          <h3 className="text-secondary-foreground">Retrofy</h3>

          <p className="text-muted-foreground">
            Retrofy is a (fun) personal project that transforms normal images
            into old-school retro style super cool images using OpenCV
            technology.
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
              href="mailto:hi@d-o.dev"
              className="underline hover:text-primary"
              target="_blank"
              title="From Retrofy"
            >
              your.email@example.com
            </a>{' '}
            or you can visit my website at{' '}
            <a
              href="https://d-o.dev"
              className="underline hover:text-primary"
              target="_blank"
            >
              d-o.dev
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  )
}
