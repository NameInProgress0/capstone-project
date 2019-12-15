import React from 'react'
import Toolbar, { Label } from './ToolbarStyle'
import MoveButton from './MoveElementButton'

export default function({
  selectElement,
  elements,
  setElements,
  children,
  cartonSide
}) {
  function moveElement() {
    if (selectElement !== 0) {
      const index = elements[cartonSide].findIndex(
        item => item.key === selectElement
      )
      const updateEl = elements.slice()
      updateEl[cartonSide][index].props.top -= 1
      setElements(updateEl)
    }
  }
  return (
    <Toolbar side="top">
      <Label />
      <MoveButton onClick={moveElement} side="Y">
        &uarr;
      </MoveButton>
      {children}
      <Label />
    </Toolbar>
  )
}
