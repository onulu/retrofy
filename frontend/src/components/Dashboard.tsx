import ImagePreview from './dashboard/ImagePreview'
import ModelMenu from './dashboard/ModelMenu'

const Dashboard = () => {
  return (
    <main className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 h-[calc(100vh-57px)]">
      <div className="hidden flex-col items-start gap-8 md:flex">
        <ModelMenu />
      </div>
      <div className="rounded-xl bg-card lg:col-span-2">
        <div className="w-full h-full flex justify-center items-center">
          <ImagePreview />
        </div>
      </div>
    </main>
  )
}
export default Dashboard
