import React, { useState } from 'react'
import styled from 'styled-components/macro'
/**
 * TODO Delete
 */
import pic from './picture.jpg'

export default function CreateImageElement({
  file,
  cartonDimension,
  setSelectElement,
  setDragfunction,
  onFocus = false
}) {
  const [startDragPosition, setStartDragPosition] = useState(null)
  const [focus, setFocus] = useState(false)
  const warpperDimensions = {
    height: cartonDimension.height * 0.5,
    width: cartonDimension.width * 0.5,
    maxHeight: cartonDimension.height - 2,
    maxWidth: cartonDimension.width - 2
  }

  function resize(event, axis) {
    if (axis === 'X')
      event.target.parentElement.style.width =
        startDragPosition.el.width + (event.pageX - startDragPosition.x) + 'px'

    if (axis === 'Y')
      event.target.parentElement.style.height =
        startDragPosition.el.height + (event.pageY - startDragPosition.y) + 'px'

    if (axis === 'XY') {
      event.target.parentElement.style.width =
        startDragPosition.el.width + (event.pageX - startDragPosition.x) + 'px'
      event.target.parentElement.style.height =
        startDragPosition.el.height + (event.pageY - startDragPosition.y) + 'px'
    }
  }
  function move(event) {
    // event.dataTransfer.setDragImage(<div />, 0, 0)

    /*
    console.log(
      startDragPosition.el.y,
      startDragPosition.el.top,
      event.pageY - startDragPosition.y
    )
    */
    const positionY =
      startDragPosition.el.top +
      (event.pageY - startDragPosition.y) -
      startDragPosition.el.top +
      startDragPosition.el.height / 2
    /* console.log('state', startDragPosition)
    console.log(
      'positionY',
      event.pageY,
      startDragPosition.y,
      event.pageY - startDragPosition.y
    )
    console.log(startDragPosition.el.top, positionY)
*/
    const positionX =
      startDragPosition.el.left +
      (event.pageX - startDragPosition.x - startDragPosition.el.width / 2)

    if (event.pageX > 0) {
      event.target.parentElement.style.left = positionX + 'px'
    }
    if (event.pageY > 0) {
      event.target.parentElement.style.top = positionY + 'px'
    }

    //   startDragPosition.el.left + (event.pageX - startDragPosition.x) + 'px'
    // event.target.parentElement.style.left =
    //  event.pageX - event.target.parentElement.+ 'px'
  }

  function onDragStart(event) {
    const empty = document.createElement('div')
    event.dataTransfer.setDragImage(empty, 0, 0)
    event.dataTransfer.setData('text', '')
    setSelectElement(event.target.parentElement)
    setStartDragPosition({
      x: event.pageX,
      y: event.pageY,
      el: event.target.parentElement.getBoundingClientRect()
    })
  }
  function rotate(event) {
    var center_x =
      startDragPosition.el.left + event.target.parentElement.offsetWidth * 0.5
    var center_y =
      startDragPosition.el.top + event.target.parentElement.offsetHeight * 0.5
    var mouse_x = event.pageX
    var mouse_y = event.pageY
    var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y)
    var degree = radians * (180 / Math.PI) * -1 + 90
    if (event.pageX > 0)
      event.target.parentElement.style.transform = `rotate(${degree}deg)`
  }
  function getFuntions() {
    return (
      <>
        <Delete onClick={event => event.target.parentElement.remove()}>
          X
        </Delete>
        <Rotate onDragStartCapture={onDragStart} onDrag={rotate} draggable>
          &#9813;
        </Rotate>
      </>
    )
  }
  return (
    <Wrapper {...warpperDimensions}>
      <Image
        //   onFocus={() => setFocus(true)}

        onClick={event => {
          setFocus(true)
          console.log(event.target.parentElement)
          console.log(event.target.parentElement.children[4])
          setSelectElement(event.target.parentElement)
        }}
        // src={URL.createObjectURL(file)}
        src={pic}
        onDragStartCapture={onDragStart}
        onDragStart={event => {
          const empty = document.createElement('div')
          event.dataTransfer.setDragImage(empty, 0, 0)
          event.dataTransfer.setData('text', '')
        }}
        onDrag={move}
      />

      <ResizeX
        onDragStartCapture={onDragStart}
        onDrag={event => resize(resize(event, 'X'))}
        draggable
      />

      <ResizeY
        resize="Y"
        onDragStartCapture={onDragStart}
        onDrag={event => resize(event, 'Y')}
        draggable
      />
      <ResizeXY
        onDragStartCapture={onDragStart}
        onDrag={event => resize(event, 'XY')}
        draggable
      />
      {focus && getFuntions()}
    </Wrapper>
  )
}

const Delete = styled.div`
  position: absolute;
  color: red;
  top: -10px;
  left: -7px;
  height: 10px;
  width: 10px;
  color: blue;
  cursor: not-allowed;
`

const Rotate = styled.div`
  position: absolute;
  color: red;
  top: -10px;
  right: -7px;
  height: 10px;
  width: 10px;
  cursor: grab;
`

const Wrapper = styled.div`
  position: absolute;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  maxheight: ${props => props.maxHeight}px;
  maxwidth: ${props => props.maxWidth}px;
`

const Image = styled.img`
  height: 100%;
  width: 100%;
`

const ResizeX = styled.div`
  position: absolute;
  height: calc(100% - 10px);
  width: 2px;
  right: -2px;
  top: 0px;
  &:hover {
    cursor: ew-resize;
  }
  &:active {
    cursor: ew-resize;
  }
`

const ResizeY = styled.div`
  height: 2px;
  position: absolute;
  width: calc(100% - 10px);
  bottom: 0px;
  &:hover {
    cursor: ns-resize;
  }
  &:active {
    cursor: ns-resize;
  }
`
const ResizeXY = styled.div`
  position: absolute;
  height: 10px;
  width: 10px;
  bottom: 0px;
  right: -2px;
  &:hover {
    cursor: nwse-resize;
  }
  &:active {
    cursor: ns-resize;
  }
`
