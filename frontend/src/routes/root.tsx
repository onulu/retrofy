import { Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <div className="min-h-screen flex justify-center py-20">
      <div className="relativ bg-slate-800 flex-col max-w-[800px] w-full m-auto min-h-96 rounded-lg p-4">
        <h1 className="mb-20">Enhancify: AI-Powered Image Enhancement Tool</h1>
        <div className="w-full relative bg-slate-900 rounded-lg h-96">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
