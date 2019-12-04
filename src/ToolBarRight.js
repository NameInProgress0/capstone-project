import React from 'react'
import Toolbar from './ToolbarStyle'
import MoveButton from './MoveElementButton'

export default function({ selectElement }) {
  function moveElement() {
    if (
      selectElement !== null &&
      selectElement.getAttribute('data-el') !== 'Carton'
    ) {
      const elPos = selectElement.getBoundingClientRect()
      const carPos = selectElement.parentElement.getBoundingClientRect()

      selectElement.style.left = elPos.left - carPos.left + 1 + 'px'
    }
  }
  return (
    <Toolbar side="right">
      <MoveButton onClick={moveElement} side="X">
        &rarr;
      </MoveButton>
    </Toolbar>
  )
}
