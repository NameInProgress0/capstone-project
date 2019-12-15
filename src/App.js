import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components/macro'
import Carton from './Carton'
import ToolbarTop from './ToolbarTop'
import ToolbarRight from './ToolbarRight'
import ToolbarBottom from './ToolbarBottom'
import ToolbarLeft from './ToolbarLeft'

export default function App({ width, height, depth }) {
  const [selectElement, setSelectElement] = useState(0)
  const [elements, setElements] = useState([[], [], [], []])
  const [cartonSide, setCartonSide] = useState(0)

  useKeyPress()

  function useKeyPress() {
    function downHandler({ keyCode }) {
      if (selectElement !== 0) {
        const index = elements[cartonSide].findIndex(
          item => item.key === selectElement
        )
        if (!elements[cartonSide][index].props.changeText) {
          const update = elements[cartonSide][index].props

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

          const updateElements = elements.slice()
          updateElements[cartonSide][index].props = {
            ...updateElements[cartonSide][index].props,
            update
          }

          setElements(updateElements)
        }
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

  function handleCartonSide(turnSide) {
    let turn = 0
    switch (turnSide) {
      case 'left':
        turn = cartonSide - 1
        break
      case 'right':
        turn = cartonSide + 1
        break
      default:
        return
    }

    turn = turn < 0 ? 3 : turn
    turn = turn > 3 ? 0 : turn

    const carton = document.querySelector('[data-el=Carton]')

    carton.style.overflow = 'unset'
    carton.style.transformStyle = 'preserve-3d'

    const sideToRotateDimensions = {}

    sideToRotateDimensions.height = cartonDimensions.height
    sideToRotateDimensions.width = cartonDimensions.depth
    sideToRotateDimensions.depth = cartonDimensions.width
    sideToRotateDimensions.scale = cartonDimensions.scale

    const sideToRotate = document.createElement('div')

    const halfWidth =
      (sideToRotateDimensions.width * sideToRotateDimensions.scale) / 2

    let translateX = ''

    if (turnSide === 'left') translateX = '-' + halfWidth
    else
      translateX =
        turn % 2
          ? sideToRotateDimensions.width * scale * 2 + halfWidth
          : '-' + (sideToRotateDimensions.depth * scale) / 2

    sideToRotate.style.transform = `translateZ(-${halfWidth}px) translateX(${translateX}px)  rotateY(90deg)  `
    sideToRotate.style.height =
      sideToRotateDimensions.height * sideToRotateDimensions.scale + 'px'
    sideToRotate.style.width =
      sideToRotateDimensions.width * sideToRotateDimensions.scale + 'px'

    sideToRotate.style.top = '-1px'
    sideToRotate.style.position = 'absolute'

    ReactDOM.render(
      <Carton
        dimensions={sideToRotateDimensions}
        setSelectElement={setSelectElement}
        selectElement={selectElement}
        elements={elements}
        addElement={addElement}
        setElements={setElements}
        cartonSide={turn}
        reflect={turnSide === 'left'}
      />,
      sideToRotate
    )

    carton.appendChild(sideToRotate)

    let deg = 0
    let translateZ = 0
    const translateStep = halfWidth / 90

    const normalize = () => {
      carton.style.transform = 'translateZ(0px) translateX(0px) rotateY(0deg)  '
      carton.style.overflow = 'hidden'
      sideToRotate.remove()
      setCartonSide(turn)
    }

    const rotate = () => {
      carton.style.transform =
        'rotateY(' + deg + 'deg) translateZ(' + translateZ + 'px)'

      translateZ += translateStep

      turnSide === 'left' ? deg++ : deg--
      ;(deg > 90 && turnSide === 'left') || (deg < -90 && turnSide === 'right')
        ? normalize()
        : setTimeout(rotate, 100)
    }
    rotate()
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

  if (cartonSide % 2) {
    const originalWidth = cartonDimensions.width
    cartonDimensions.width = cartonDimensions.depth
    cartonDimensions.depth = originalWidth
  }

  useEffect(() => {
    if (selectElement !== 0) {
      const { height, width } = elements[cartonSide].filter(
        item => item.key === selectElement
      )[0].props
      setElementDimensions({ height, width })
    } else {
      const height = cartonDimensions.height * cartonDimensions.scale,
        width = cartonDimensions.width * cartonDimensions.scale
      setElementDimensions({ height, width })
    }
  }, [selectElement, elements, cartonSide])

  function addElement(props) {
    const update = elements.slice()
    update[cartonSide] = [...elements[cartonSide], props]
    setElements(update)
  }

  return (
    <Wrapper>
      <ToolbarTop
        cartonSide={cartonSide}
        selectElement={selectElement}
        elements={elements}
        setElements={setElements}
      >
        <CartonDimension side="top">
          {((elementDimensions.width / scale) * pxCalc.pxTocm).toFixed(2)} cm
        </CartonDimension>
      </ToolbarTop>
      <ToolbarLeft
        cartonSide={cartonSide}
        handleCartonSide={handleCartonSide}
        selectElement={selectElement}
        elements={elements}
        setElements={setElements}
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
          cartonSide={cartonSide}
        />
      </Board>
      <ToolbarRight
        selectElement={selectElement}
        elements={elements}
        setElements={setElements}
        handleCartonSide={handleCartonSide}
        cartonSide={cartonSide}
      />
      <ToolbarBottom
        selectElement={selectElement}
        addElement={addElement}
        elements={elements}
        setElements={setElements}
        cartonSide={cartonSide}
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
