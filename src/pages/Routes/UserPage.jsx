import { Redirect, Route, Switch } from 'react-router-dom'

import Home from 'src/pages/Home'

function UserPage() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  )
}

export default UserPage
