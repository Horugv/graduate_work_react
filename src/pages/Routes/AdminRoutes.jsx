import { Redirect, Switch, Route } from 'react-router-dom'

import AdminPage from './AdminPage'

const AdminApp = () => {
  const userDataRole = 'ROLE_ADMIN' // todo rewrite after auth functional`s finish
  const isAvailable = userDataRole === 'ROLE_ADMIN'
  return (
    <Switch>
      <Route path="/admin">
        <Switch>
          {!isAvailable ? (
            <Redirect from="/admin" to="/error" />
          ) : (
            <AdminPage />
          )}
        </Switch>
      </Route>
    </Switch>
  )
}

export default AdminApp
