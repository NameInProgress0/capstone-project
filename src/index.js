import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import * as serviceWorker from './serviceWorker'
import Globalstyles from './globalStyles'

const carton = {
  height: 1000, // mm
  width: 1500, // mm
  depth: 500 //mm
}
ReactDOM.render(
  <>
    <App {...carton} />
    <Globalstyles />
  </>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
