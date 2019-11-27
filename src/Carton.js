import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import CreateImageElement from './CreateImageElement'

export default function Carton({
  dimensions,
  setSelectElement,
  selectElement
}) {
  const [childs, setChilds] = useState([])
  const [dragFunction, setDragfunction] = useState(false)
  const height = dimensions.height * dimensions.scale
  const width = dimensions.width * dimensions.scale
  function handleDrop(event) {
    console.log(event)
    if (event.dataTransfer.files[0]) {
      setChilds([
        ...childs,
        <CreateImageElement
          key={Math.random()}
          file={event.dataTransfer.files[0]}
          cartonDimension={{ width: width, height: height }}
          //     setDragfunction={setDragfunction}
          setSelectElement={setSelectElement}
        />
      ])
      event.preventDefault()
      /*
      setChilds([
        ...childs,
        <CreateImageElement
          file={event.dataTransfer.files[0]}
          cartonDimensions="halllo"
        />
      ])*/
    }
  }

  return (
    <Cartons
      height={height}
      width={width}
      onDrag={event => {
        event.preventDefault()
        const empty = document.createElement('div')
        event.dataTransfer.setDragImage(empty, 0, 0)
        //  event.dataTransfer.setData('text', '')
      }}
      //onDragStart={() => console.log('dragstart carton')}
      onDragOver={event => event.preventDefault()}
      //  onDragEnd={event => event.preventDefault()}
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
