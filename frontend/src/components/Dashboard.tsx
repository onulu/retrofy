import ImagePreview from './dashboard/ImagePreview'
import ModelMenu from './dashboard/ModelMenu'

const Dashboard = () => {
  return (
    <main className="mx-4  grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="bg-muted text-muted-foreground rounded-3xl hidden flex-col items-start gap-8 md:flex h-full px-2">
        <ModelMenu />
      </div>
      <div className="rounded-3xl bg-muted lg:col-span-2 h-[calc(100vh-57px-1rem)]">
        <div className="w-full h-full flex items-center justify-center">
          <ImagePreview />
        </div>
      </div>
    </main>
  )
}
export default Dashboard
