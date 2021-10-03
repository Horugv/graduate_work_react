import { Redirect, Route, Switch } from 'react-router-dom'

import Users from 'src/pages/Users'
import { adminLayout } from 'src/hoc/AdminLayout'

const AdminPage = () => {
  return (
    <Switch>
      <Route path="/admin/users" exact component={Users} />

      <Redirect to="/admin/users" />
    </Switch>
  )
}

export default adminLayout(AdminPage)
