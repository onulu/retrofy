import ImagePreview from './dashboard/ImagePreview'
import ModelMenu from './dashboard/ModelMenu'

const Dashboard = () => {
  return (
    <main className="mx-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 relative h-[calc(100dvh-57px-1rem)]">
      <div className="hidden flex-col items-start md:flex px-2 h-full">
        <ModelMenu />
      </div>
      <div className="rounded-3xl bg-muted lg:col-span-2 h-full flex justify-center items-center">
        <ImagePreview />
      </div>
    </main>
  )
}
export default Dashboard
