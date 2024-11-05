import ImagePreview from './dashboard/ImagePreview'
import ModelMenu from './dashboard/ModelMenu'

import MobileNav from './dashboard/MobileNav'

const Dashboard = () => {
  return (
    <main className="mx-4 grid gap-3 md:grid-cols-[min(340px,40%)_1fr] lg:grid-cols-[minmax(360px,33%)_1fr_1fr] relative h-[calc(100dvh-57px-1rem)]">
      <div className="hidden flex-col items-start md:flex px-2 h-full bg-muted rounded-3xl">
        <ModelMenu />
      </div>
      <MobileNav />
      <div className="rounded-3xl bg-muted lg:col-span-2 h-full flex justify-center items-center">
        <ImagePreview />
      </div>
    </main>
  )
}
export default Dashboard
