import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'

import AdminApp from './AdminRoutes'
import CatalogApp from './UserRoutes'

import ErrorPage from 'src/pages/ErrorPage'

const Routes = () => {
  return (
    <Switch>
      <Route path="/admin" component={AdminApp} />
      <Route path="/" component={CatalogApp} />
      <Route path="/error" component={ErrorPage} />
      <Redirect to="/error" />
    </Switch>
  )
}

export default Routes
