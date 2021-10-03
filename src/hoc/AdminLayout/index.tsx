import { BrowserRouter as Router } from 'react-router-dom'

export const adminLayout = (WrappedComponent: () => JSX.Element) => {
  const Layout = () => {
    return (
      <Router>
        <div className="admin_app">
          <WrappedComponent />
        </div>
      </Router>
    )
  }
  return Layout
}
