import camelCase from 'lodash/camelCase'
import reduce from 'lodash/fp/reduce'
import set from 'lodash/fp/set'
import { combineReducers } from 'redux'

const req = require.context('.', true, /\.\/.+\/reducer\.js$/)

const reducers = reduce(
  (acc, key) => {
    const storeName = camelCase(key.replace(/\.\/(.+)\/.+$/, '$1'))
    return set(storeName, req(key).default, acc)
  },
  {},
  req.keys(),
)

export default combineReducers(reducers)
