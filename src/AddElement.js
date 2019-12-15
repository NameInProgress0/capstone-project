import React from 'react'
import styled from 'styled-components/macro'
import CreateElement from './CreateElement'

export default function({
  file = false,
  setSelectElement,
  type,
  handleDeleteElement,
  isSelected,
  props,
  id,
  handleBlur
}) {
  return (
    <Wrapper id={id} data-el={type} {...props} selected={isSelected}>
      <CreateElement
        props={props}
        onClick={setSelectElement}
        file={file}
        handleBlur={handleBlur}
      />
      <ResizeX data-dragevent="resizeX" draggable />
      <ResizeY resize="Y" data-dragevent="resizeY" draggable />
      <ResizeXY data-dragevent="resizeXY" draggable />
      <Delete selected={isSelected} onClick={handleDeleteElement}>
        X
      </Delete>
      <Rotate data-dragevent="rotate" draggable selected={isSelected}>
        &#9813;
      </Rotate>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 1px solid ${props => (props.selected ? 'black' : 'transparent')};
  position: absolute;
  height: ${props => props.height}px;
  width: ${props => (props.changeText ? 'auto' : props.width + 'px')};
  maxheight: calc(100% - 2px);
  maxwidth: calc(100% - 2px);
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  transform: rotate(${props => props.rotate}deg);
  background-color: ${props => props.background};
`

const Delete = styled.div`
  display: ${props => (props.selected ? '' : 'none')};
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
  display: ${props => (props.selected ? '' : 'none')};
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
