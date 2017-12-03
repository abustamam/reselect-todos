import React from 'react'

import Header from './containers/Header'
import MainSection from './containers/MainSection'

const App = () => (
  <div>
    <Header />
    <MainSection listId="1" />
    <MainSection listId="2" />
  </div>
)

export default App
