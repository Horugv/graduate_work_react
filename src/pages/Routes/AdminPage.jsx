import { Redirect, Route, Switch } from 'react-router-dom'

import Users from 'src/pages/Users'
import Markers from 'src/pages/Markers'
import MarkerForm from 'src/pages/Markers/Form'
import { adminLayout } from 'src/hoc/AdminLayout'

const AdminPage = () => {
  return (
    <Switch>
      <Route path="/admin/users" exact component={Users} />
      <Route path="/admin/markers" exact component={Markers} />.
      <Route path="/admin/marker/:id" exact component={MarkerForm} />
      <Redirect to="/admin/users" />
    </Switch>
  )
}

export default adminLayout(AdminPage)
