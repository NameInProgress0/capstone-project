import React, { useState } from 'react'

import styled from 'styled-components/macro'
import AddElement from './AddElement'

export default function({
  dimensions,
  // setSelectElement,
  // selectElement,
  elements,
  addElement,
  setElements
}) {
  let dragEvent = false
  let startPosition = {}
  const height = dimensions.height * dimensions.scale
  const width = dimensions.width * dimensions.scale
  const [selectedElement, setSelectedElement] = useState(0)
  /*
  function handleClick(event) {
    setSelectElement(event.target)
    event.stopPropagation()
  }
*/
  function onDragStart(event) {
    dragEvent = {
      el: event.target.parentElement,
      function: event.target.getAttribute('data-dragevent')
    }
    startPosition = {
      x: event.pageX,
      y: event.pageY,
      el: dragEvent.el.getBoundingClientRect(),
      carton: dragEvent.el.parentElement.getBoundingClientRect()
    }
    const empty = document.createElement('div')
    event.dataTransfer.setDragImage(empty, 0, 0)
    event.dataTransfer.setData('text', '')
  }

  function handleDragOver(event) {
    event.preventDefault()
    event.stopPropagation()
    if (dragEvent) handleDragFunctions(event, startPosition, dragEvent)
  }
  function handelDragEnd() {
    dragEvent = false
  }

  function handleSelectElement(key) {
    if (selectedElement !== 0) {
      console.log('reset el')
      const index1 = elements.findIndex(item => item.key === selectedElement)
      setElements([
        ...elements.slice(0, index1),
        { ...elements[index1], selected: false },
        ...elements.slice(index1 + 1)
      ])
    }
    setSelectedElement(key)
    console.log('set selected', key)
    if (key !== 0) {
      const index = elements.findIndex(item => item.key === key)
      setElements([
        ...elements.slice(0, index),
        { ...elements[index], selected: true },
        ...elements.slice(index + 1)
      ])
    }
  }

  function handleDeleteElement(key) {
    const index = elements.findIndex(item => item.key === key)
    setElements([...elements.slice(0, index), ...elements.slice(index + 1)])
  }

  function handleDrop(event) {
    event.preventDefault()
    event.stopPropagation()
    if (!dragEvent) {
      addElement({
        key: Math.random(),
        dataEl: 'Image',
        el: event.dataTransfer.files[0]
      })
    }
  }
  return (
    <Carton
      data-el="Carton"
      height={height}
      width={width}
      onClick={() => handleSelectElement(0)}
      onDragStart={onDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handelDragEnd}
      onDrop={handleDrop}
    >
      {elements.map(item => (
        <AddElement
          key={item.key}
          dataEl={item.dataEl}
          el={item.el}
          cartonDimension={{
            width: item.width || width,
            height: item.width || height
          }}
          setSelectElement={() => handleSelectElement(item.key)}
          isSelected={item.selected}
          handleDeleteElement={() => handleDeleteElement(item.key)}
          text={item.text || ''}
        />
      ))}
    </Carton>
  )
}

const Carton = styled.section`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  max-height: 80%;
  max-width: 80%;
  position: relative;
  background-color: saddlebrown;
  overflow: hidden;
  border-color: black;
  border-style: solid;
  border-width: 1px;
`

function handleDragFunctions(event, startPosition, dragEvent) {
  if (dragEvent.function === 'move') {
    dragEvent.el.style.left =
      event.pageX -
      startPosition.x +
      (startPosition.el.left - startPosition.carton.left) +
      'px'
    dragEvent.el.style.top =
      event.pageY -
      startPosition.y +
      (startPosition.el.top - startPosition.carton.top) +
      'px'
  }
  if (dragEvent.function === 'resizeX' || dragEvent.function === 'resizeXY') {
    dragEvent.el.style.width =
      startPosition.el.width + (event.pageX - startPosition.x) + 'px'
  }
  if (dragEvent.function === 'resizeY' || dragEvent.function === 'resizeXY') {
    dragEvent.el.style.height =
      startPosition.el.height + (event.pageY - startPosition.y) + 'px'
    /**
     * resize Font size
     */
    if (dragEvent.el.getAttribute('data-el') === 'Text') {
      dragEvent.el.firstChild.style.fontSize =
        dragEvent.el.getBoundingClientRect().height * 0.63 + 'px'
      dragEvent.el.style.width = 'auto'
      dragEvent.el.style.height = 'auto'
    }
  }
  if (dragEvent.function === 'rotate') {
    var center_x = startPosition.el.left + dragEvent.el.offsetWidth * 0.2
    var center_y = startPosition.el.top + dragEvent.el.offsetHeight * 0.1
    var radians = Math.atan2(event.pageX - center_x, event.pageY - center_y)
    var degree = radians * (180 / Math.PI) * -1 + 90
    dragEvent.el.style.transform = `rotate(${degree}deg)`
  }
}
