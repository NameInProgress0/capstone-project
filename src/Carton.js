import React, { useState } from 'react'
import styled from 'styled-components/macro'
import CreateImageElement from './CreateImageElement'

export default function Carton({
  dimensions,
  setSelectElement,
  selectElement
}) {
  const [childs, setChilds] = useState([])
  const height = dimensions.height * dimensions.scale
  const width = dimensions.width * dimensions.scale
  function handleDrop(event) {
    if (event.dataTransfer.files[0]) {
      setChilds([
        ...childs,
        <CreateImageElement
          key={Math.random()}
          file={event.dataTransfer.files[0]}
          cartonDimension={{ width: width, height: height }}
          setSelectElement={setSelectElement}
          selectElement={selectElement}
        />
      ])
      event.preventDefault()
    }
  }

  return (
    <Cartons
      height={height}
      width={width}
      onClick={event => {
        setSelectElement(event.target)
        event.stopPropagation()
      }}
      onDrag={event => {
        event.preventDefault()
      }}
      onDragStart={event => {
        const empty = document.createElement('div')
        event.dataTransfer.setDragImage(empty, 0, 0)
        event.dataTransfer.setData('text', '')
      }}
      onDragOver={event => {
        event.preventDefault()
      }}
      onDrop={event => {
        event.preventDefault()
        event.stopPropagation()

        handleDrop(event)
      }}
    >
      {childs}
    </Cartons>
  )
}

const Cartons = styled.section`
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
