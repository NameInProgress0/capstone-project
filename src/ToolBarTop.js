import React from 'react'
import Toolbar, { Label } from './ToolbarStyle'
import MoveButton from './MoveElementButton'

export default function({ selectElement, elements, setElements, children }) {
  function moveElement() {
    if (selectElement !== 0) {
      const index = elements.findIndex(item => item.key === selectElement)

      setElements([
        ...elements.slice(0, index),
        {
          ...elements[index],
          props: {
            ...elements[index].props,
            top: elements[index].props.top - 1
          }
        },
        ...elements.slice(index + 1)
      ])
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
