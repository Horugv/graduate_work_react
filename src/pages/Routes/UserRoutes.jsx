import React from 'react'
import { Switch, Route } from 'react-router-dom'
import UserPage from './UserPage'

export default function AdminApp() {
  return (
    <Switch>
      <Route path="/">
        <UserPage />
      </Route>
    </Switch>
  )
}
