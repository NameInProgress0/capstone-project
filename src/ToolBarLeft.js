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

      setElements([
        ...elements,
        [
          ...elements[cartonSide].slice(0, index),
          {
            ...elements[cartonSide][index],
            props: {
              ...elements[cartonSide][index].props,
              left: elements[cartonSide][index].props.left - 1
            }
          },
          ...elements[cartonSide].slice(index + 1)
        ]
      ])
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
