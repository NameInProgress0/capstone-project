import React from 'react'
import Toolbar from './ToolbarStyle'
import MoveButton from './MoveElementButton'

export default function({
  selectElement,
  elements,
  setElements,
  children,
  handleCartonSide,
  cartonSide
}) {
  function moveElement() {
    selectElement === 0 && handleCartonSide('left')

    if (selectElement !== 0) {
      const index = elements[cartonSide].findIndex(
        item => item.key === selectElement
      )
      const updateEl = elements.slice()
      updateEl[cartonSide][index].props.left -= 1
      setElements(updateEl)
    }
  }

  return (
    <Toolbar side="left">
      <MoveButton onClick={moveElement} side="X">
        &larr;
      </MoveButton>
      {children}
    </Toolbar>
  )
}
