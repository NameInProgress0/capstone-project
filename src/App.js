import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import Carton from './Carton'
import ToolbarButtom from './ToolbarButtom'
import Toolbar from './ToolbarStyle'

function App({ width, height, depth }) {
  const [selectElement, setSelectElement] = useState(null)
  const [elementDimensions, setElementDimensions] = useState({})
  const [elements, setElements] = useState([])
  const pxCalc = {
    mmToPx: 3.779528,
    pxTomm: 0.2645833333,
    pxTocm: 0.0264583333
  }

  const cartonDimensions = {
    height: height * pxCalc.mmToPx,
    width: width * pxCalc.mmToPx,
    depth: depth * pxCalc.mmToPx
  }

  const scale = getScale(cartonDimensions)
  cartonDimensions.scale = scale

  useEffect(() => {
    const { height, width } = cartonDimensions
    setElementDimensions({ height, width })
  }, [])

  function addElement(props) {
    setElements([...elements, props])
  }

  function updateElement(el) {
    if (
      selectElement !== null &&
      selectElement.getAttribute('data-el') !== 'Carton'
    ) {
      selectElement.style.borderColor = 'transparent'
      selectElement.children[4].hidden = true
      selectElement.children[5].hidden = true
    }

    if (el.getAttribute('data-el') !== 'Carton') {
      el.style.borderColor = 'black'
      el.children[4].hidden = false
      el.children[5].hidden = false
    }

    setSelectElement(el)
    const { width, height } = el.getBoundingClientRect()
    setElementDimensions({ width: width / scale, height: height / scale })
  }

  return (
    <Wrapper>
      <Toolbar side="top">
        <CartonDimension side="top">
          {(elementDimensions.width * pxCalc.pxTocm).toFixed(2)} cm
        </CartonDimension>
      </Toolbar>
      <Toolbar side="left">
        <CartonDimension side="left">
          {(elementDimensions.height * pxCalc.pxTocm).toFixed(2)} cm
        </CartonDimension>
      </Toolbar>
      <Board>
        <Carton
          dimensions={cartonDimensions}
          setSelectElement={updateElement}
          selectElement={selectElement}
          elements={elements}
          addElement={addElement}
          setElements={setElements}
        />
      </Board>
      <Toolbar side="right" />
      <ToolbarButtom
        setSelectElement={updateElement}
        selectElement={selectElement}
        addElement={addElement}
      />
    </Wrapper>
  )
}

export default App

const Wrapper = styled.article`
  width: calc(100vw - 20px);
  height: calc(100vh - 20px);
  margin: 10px;
  border: 1px solid black;
  display: grid;
  grid-template-rows: 60px auto 60px;
  grid-template-columns: 60px auto 60px;
`

const Board = styled.section`
  grid-area: 2/2/3/3;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  position: relative;
`

const CartonDimension = styled.p`
  ${props => {
    if (props.side === 'top') {
      return `
        width: 100%;
        top:100%;
        
        `
    } else {
      return `
      width: 600%;
      top:50%;
      transform: rotate(-90deg);
      left:-185%;
      `
    }
  }}

  margin: 0;
  position: absolute;
  text-align: center;
`

function getScale(cartonDimensions) {
  let scale = ((window.innerHeight - 140) * 0.8) / cartonDimensions.height

  if (window.innerWidth - 140 < cartonDimensions.width * scale) {
    scale = ((window.innerWidth - 140) * 0.8) / cartonDimensions.width
  }
  return scale
}
