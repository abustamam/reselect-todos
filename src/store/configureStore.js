import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'

const devtools = window.devToolsExtension
  ? window.devToolsExtension
  : () => fn => fn

const middlewares = [] // in case we want to add later

const configureStore = (initialState = {}) => {
  const enhancers = [applyMiddleware(...middlewares), devtools()]
  const store = createStore(reducer, initialState, compose(...enhancers))

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

export default configureStore
