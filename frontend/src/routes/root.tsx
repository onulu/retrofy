import { Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <div className="">
      <h1 className="p-4 mx-auto border-b">Enhancify: AI-Powered Image Tool</h1>
      <p>hello</p>
      <Outlet />
    </div>
  )
}
