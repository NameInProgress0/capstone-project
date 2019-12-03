import React from 'react'
import styled from 'styled-components/macro'
import CreateElement from './CreateElement'

export default function({
  el = false,
  cartonDimension = false,
  setSelectElement,
  text = false,
  dataEl,
  handleDeleteElement
}) {
  const warpperDimensions = {
    height: cartonDimension.height * 0.5 || 'auto',
    width: cartonDimension.width * 0.5 || 'auto'
  }

  return (
    <Wrapper data-el={dataEl} {...warpperDimensions}>
      <CreateElement
        onkeydown={event => console.log(event)}
        onClick={event => {
          event.stopPropagation()
          setSelectElement(event.target.parentElement)
        }}
        el={el}
        text={text}
      />
      <ResizeX data-dragevent="resizeX" draggable />

      <ResizeY resize="Y" data-dragevent="resizeY" draggable />
      <ResizeXY data-dragevent="resizeXY" draggable />
      <Delete
        onClick={event => {
          event.stopPropagation()
          handleDeleteElement()
        }}
        hidden
      >
        X
      </Delete>
      <Rotate data-dragevent="rotate" draggable hidden>
        &#9813;
      </Rotate>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 1px solid transparent;
  position: absolute;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  maxheight: calc(100% - 2px);
  maxwidth: calc(100% - 2px);
  top: calc(50% - ${props => props.height * 0.5}px);
  left: calc(50% - ${props => props.width * 0.5}px);
`

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
