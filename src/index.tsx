import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

import { store } from 'src/redux/store'
import setupAxios from 'src/axios/setupAxios'

import Routes from 'src/pages/Routes'

import 'src/assets/styles/global.scss'

setupAxios(axios, store)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)

