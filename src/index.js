import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import 'todomvc-app-css/index.css'

import registerServiceWorker from './registerServiceWorker'
import App from './App'
import configureStore from './store/configureStore'

const store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()
