import React from 'react'
import styled from 'styled-components/macro'
import AddElement from './AddElement'

export default function({
  dimensions,
  setSelectElement,
  selectElement,
  elements,
  addElement,
  setElements,
  cartonSide
}) {
  let dragEvent = false
  let startPosition = {}
  const height = dimensions.height * dimensions.scale
  const width = dimensions.width * dimensions.scale

  function onDragStart(event) {
    dragEvent = {
      el: event.target.parentElement,
      function: event.target.getAttribute('data-dragevent'),
      id: event.target.parentElement.id
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
    if (dragEvent)
      dragEvent.update = handleDragFunctions(event, startPosition, dragEvent)
  }
  function handelDragEnd() {
    if (dragEvent) {
      const index = elements[cartonSide].findIndex(
        item => item.key === dragEvent.id
      )

      setElements([
        ...elements,
        [
          ...elements[cartonSide].slice(0, index),
          {
            ...elements[cartonSide][index],
            props: { ...elements[cartonSide][index].props, ...dragEvent.update }
          },
          ...elements[cartonSide].slice(index + 1)
        ]
      ])
    }

    dragEvent = false
  }

  function handleSelectElement(event, key) {
    event.stopPropagation()

    if (key === selectElement && selectElement !== 0) {
      const index = elements[cartonSide].findIndex(
        item => item.key === selectElement
      )
      if (elements[cartonSide][index].props.hasOwnProperty('changeText')) {
        setElements([
          ...elements,
          [
            ...elements.slice(0, index),
            {
              ...elements[index],
              props: { ...elements[index].props, changeText: true }
            },
            ...elements.slice(index + 1)
          ]
        ])
      }
    } else {
      if (selectElement !== 0) {
        const index = elements[cartonSide].findIndex(
          item => item.key === selectElement
        )
        setElements([
          ...elements,
          [
            ...elements.slice(0, index),
            { ...elements[index], selected: false },
            ...elements.slice(index + 1)
          ]
        ])
      }

      if (key !== 0) {
        const index = elements[cartonSide].findIndex(item => item.key === key)
        setElements([
          ...elements,
          [
            ...elements.slice(0, index),
            { ...elements[index], selected: true },
            ...elements.slice(index + 1)
          ]
        ])
      }
    }

    setSelectElement(key)
  }

  function handleDeleteElement(key) {
    const index = elements[cartonSide].findIndex(item => item.key === key)
    setElements([
      ...elements,
      [
        ...elements[cartonSide].slice(0, index),
        ...elements[cartonSide].slice(index + 1)
      ]
    ])
  }

  function handleDrop(event) {
    event.preventDefault()
    event.stopPropagation()
    if (!dragEvent) {
      addElement({
        key: 'el' + String(Math.random()).replace('.', ''),
        type: 'Image',
        file: event.dataTransfer.files[0],
        selected: false,
        props: {
          height: height * 0.5,
          width: width * 0.5,
          top: height * 0.5,
          left: width * 0.5
        }
      })
    }
  }

  function handleBlur(event) {
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
            text: event.target.textContent,
            width: event.target.parentElement.offsetWidth,
            changeText: false
          }
        },
        ...elements[cartonSide].slice(index + 1)
      ]
    ])
  }
  return (
    <Carton
      data-el="Carton"
      height={height}
      width={width}
      onClick={event => handleSelectElement(event, 0)}
      onDragStart={onDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handelDragEnd}
      onDrop={handleDrop}
    >
      {elements[cartonSide].map(item => (
        <AddElement
          id={item.key}
          props={item.props}
          key={item.key}
          type={item.type}
          file={item.file}
          cartonDimension={{
            width: width,
            height: height
          }}
          setSelectElement={event => handleSelectElement(event, item.key)}
          isSelected={item.selected}
          handleDeleteElement={() => handleDeleteElement(item.key)}
          handleBlur={handleBlur}
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
  border: 1px solid black;
`

function handleDragFunctions(event, startPosition, dragEvent) {
  let update = {}

  if (dragEvent.function === 'move') {
    const left =
      event.pageX -
      startPosition.x +
      (startPosition.el.left - startPosition.carton.left)

    const top =
      event.pageY -
      startPosition.y +
      (startPosition.el.top - startPosition.carton.top)

    dragEvent.el.style.left = left + 'px'
    dragEvent.el.style.top = top + 'px'
    update.left = left
    update.top = top
  }
  if (dragEvent.function === 'resizeX' || dragEvent.function === 'resizeXY') {
    const width = startPosition.el.width + (event.pageX - startPosition.x)

    dragEvent.el.style.width = width + 'px'
    update.width = width
  }
  if (dragEvent.function === 'resizeY' || dragEvent.function === 'resizeXY') {
    const height = startPosition.el.height + (event.pageY - startPosition.y)

    dragEvent.el.style.height = height + 'px'
    update.height = height
    /**
     * resize Font size
     */
    if (dragEvent.el.getAttribute('data-el') === 'Text') {
      dragEvent.el.firstChild.style.fontSize =
        dragEvent.el.getBoundingClientRect().height * 0.63 + 'px'
      dragEvent.el.style.width = 'auto'
      dragEvent.el.style.height = 'auto'

      update.fontSize = height * 0.63
    }
  }
  if (dragEvent.function === 'rotate') {
    var center_x = startPosition.el.left + dragEvent.el.offsetWidth * 0.2
    var center_y = startPosition.el.top + dragEvent.el.offsetHeight * 0.1
    var radians = Math.atan2(event.pageX - center_x, event.pageY - center_y)
    var degree = Math.floor(radians * (180 / Math.PI) * -1 + 90)
    dragEvent.el.style.transform = `rotate(${degree}deg)`
    update.rotate = degree
  }
  return update
}
