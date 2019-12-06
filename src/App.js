import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import Carton from './Carton'
import ToolbarTop from './ToolBarTop'
import ToolbarRight from './ToolBarRight'
import ToolbarButtom from './ToolbarButtom'
import ToolbarLeft from './ToolBarLeft'

export default function App({ width, height, depth }) {
  const [selectElement, setSelectElement] = useState(0)
  const [elements, setElements] = useState([])

  useKeyPress()

  function useKeyPress() {
    function downHandler({ keyCode }) {
      if (selectElement !== 0) {
        const index = elements.findIndex(item => item.key === selectElement)

        const update = elements[index].props

        switch (keyCode) {
          case 37: // Arrow Left
            update.left -= 1
            break
          case 38: // Arrow UP
            update.top -= 1
            break
          case 39: // Arrow Right
            update.left += 1
            break
          case 40: // Arrow Down
            update.top += 1
            break
          default:
            return
        }

        setElements([
          ...elements.slice(0, index),
          {
            ...elements[index],
            props: { ...update }
          },
          ...elements.slice(index + 1)
        ])
      }
    }

    useEffect(() => {
      window.addEventListener('keydown', downHandler)

      return () => {
        window.removeEventListener('keydown', downHandler)
      }
    }, [selectElement, elements])
  }

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

  const [elementDimensions, setElementDimensions] = useState({
    height: cartonDimensions.height * cartonDimensions.scale,
    width: cartonDimensions.width * cartonDimensions.scale
  })

  useEffect(() => {
    if (selectElement !== 0) {
      const { height, width } = elements.filter(
        item => item.key === selectElement
      )[0].props
      setElementDimensions({ height, width })
    } else {
      const height = cartonDimensions.height * cartonDimensions.scale,
        width = cartonDimensions.width * cartonDimensions.scale
      setElementDimensions({ height, width })
    }
  }, [selectElement, elements])

  function addElement(props) {
    setElements([...elements, props])
  }

  return (
    <Wrapper>
      <ToolbarTop
        selectElement={selectElement}
        elements={elements}
        setElements={setElements}
      >
        <CartonDimension side="top">
          {((elementDimensions.width / scale) * pxCalc.pxTocm).toFixed(2)} cm
        </CartonDimension>
      </ToolbarTop>
      <ToolbarLeft
        selectElement={selectElement}
        elements={elements}
        setElements={setElements}
        side="left"
      >
        <CartonDimension side="left">
          {((elementDimensions.height / scale) * pxCalc.pxTocm).toFixed(2)} cm
        </CartonDimension>
      </ToolbarLeft>
      <Board>
        <Carton
          dimensions={cartonDimensions}
          setSelectElement={setSelectElement}
          selectElement={selectElement}
          elements={elements}
          addElement={addElement}
          setElements={setElements}
        />
      </Board>
      <ToolbarRight
        selectElement={selectElement}
        elements={elements}
        setElements={setElements}
      />
      <ToolbarButtom
        selectElement={selectElement}
        addElement={addElement}
        elements={elements}
        setElements={setElements}
      />
    </Wrapper>
  )
}

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
