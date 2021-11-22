import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

import { store } from 'src/redux/store'
import setupAxios from 'src/axios/setupAxios'
import 'src/firebase'

import Routes from 'src/pages/Routes'
import App from 'src/App'

import 'src/assets/styles/global.scss'

setupAxios(axios)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App>
          <Routes />
        </App>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
