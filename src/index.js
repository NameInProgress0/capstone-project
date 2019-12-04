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

let element = null

function setMoveElement(el) {
  element = el
}

document.body.addEventListener('keydown', event => {
  if (element !== null && element.getAttribute('data-el') !== 'Carton') {
    switch (event.keyCode) {
      case 37: // Arrow Left
        element.style.left =
          Number(element.style.left.replace('px', '')) - 1 + 'px'

        break
      case 38: // Arrow Up
        element.style.top =
          Number(element.style.top.replace('px', '')) - 1 + 'px'

        break
      case 39: // Arrow Right
        element.style.left =
          Number(element.style.left.replace('px', '')) + 1 + 'px'

        break
      case 40: // Arrow Down
        element.style.top =
          Number(element.style.top.replace('px', '')) + 1 + 'px'

        break
      default:
        return
    }
  }
})

ReactDOM.render(
  <>
    <App setMoveElement={setMoveElement} {...carton} />
    <Globalstyles />
  </>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
