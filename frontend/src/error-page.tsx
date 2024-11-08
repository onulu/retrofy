import { useRouteError } from 'react-router-dom'

type CustomError = {
  statusText: string
  message: string
}

export default function ErrorPage() {
  const error = useRouteError() as CustomError

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry an unexpected error has occurred.</p>
      <i>{error.statusText || error.message}</i>
    </div>
  )
}
