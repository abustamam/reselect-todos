import uuid from 'uuid/v4'

const initialState = {
  allTodos: [
    { id: uuid(), title: 'Learn React', done: false },
    { id: uuid(), title: 'Learn Redux', done: false },
    { id: uuid(), title: 'Learn Reselect', done: false },
  ],
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    default:
      return state
  }
}
