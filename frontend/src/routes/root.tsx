import { Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <div className="m-2 min-w-80 max-w-[1024px] lg:mx-auto">
      <h1 className="bg-zinc-900 mb-2 p-4 rounded-full">
        Enhancify: AI-Powered Image Tool
      </h1>
      <Outlet />
    </div>
  )
}
