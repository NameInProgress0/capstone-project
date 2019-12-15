import React from 'react'
import Toolbar from './ToolbarStyle'
import MoveButton from './MoveElementButton'

export default function({
  selectElement,
  elements,
  setElements,
  handleCartonSide,
  cartonSide
}) {
  function moveElement() {
    selectElement === 0 && handleCartonSide('right')
    if (selectElement !== 0) {
      const index = elements[cartonSide].findIndex(
        item => item.key === selectElement
      )
      const updateEl = elements.slice()
      updateEl[cartonSide][index].props.left += 1
      setElements(updateEl)
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
