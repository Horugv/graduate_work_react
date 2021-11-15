import { Redirect, Route, Switch } from 'react-router-dom'

import Users from 'src/pages/Users'
import Markers from 'src/pages/Markers'
import { adminLayout } from 'src/hoc/AdminLayout'

const AdminPage = () => {
  return (
    <Switch>
      <Route path="/admin/users" exact component={Users} />
      <Route path="/admin/markers" exact component={Markers} />

      <Redirect to="/admin/users" />
    </Switch>
  )
}

export default adminLayout(AdminPage)
