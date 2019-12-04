import React from 'react'
import Toolbar from './ToolbarStyle'
import MoveButton from './MoveElementButton'

export default function({ selectElement, setSelectElement }) {
  function moveElement() {
    if (
      selectElement !== null &&
      selectElement.getAttribute('data-el') !== 'Carton'
    ) {
      const elPos = selectElement.getBoundingClientRect()
      const carPos = selectElement.parentElement.getBoundingClientRect()

      const el = selectElement
      const bla = elPos.top - carPos.top
      console.log(bla)
      console.log(bla - 1)
      console.log(elPos.top - carPos.top)
      console.log(carPos.top - elPos.top)
      selectElement.style.top = bla - 1 + 'px'
      // selectElement.getBoundingClientRect.left += 1
      console.log(selectElement.scrollLeft)
      setSelectElement(el)
    }
  }
  return (
    <Toolbar side="top">
      <MoveButton onClick={moveElement} side="Y">
        &uarr;
      </MoveButton>
    </Toolbar>
  )
}
