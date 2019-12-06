import React from 'react'
import Toolbar from './ToolbarStyle'
import MoveButton from './MoveElementButton'

export default function({ selectElement, elements, setElements }) {
  function moveElement() {
    if (selectElement !== 0) {
      const index = elements.findIndex(item => item.key === selectElement)

      setElements([
        ...elements.slice(0, index),
        {
          ...elements[index],
          props: {
            ...elements[index].props,
            left: elements[index].props.left + 1
          }
        },
        ...elements.slice(index + 1)
      ])
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
