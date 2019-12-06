import React from 'react'
import styled from 'styled-components/macro'

export default function(props) {
  let element = ''
  if (props.file) {
    element = (
      <Image
        {...props}
        src={URL.createObjectURL(props.el)}
        data-dragevent="move"
      />
    )
  } else {
    element = (
      <Element {...props} data-dragevent="move" draggable>
        {props.props.text}
      </Element>
    )
  }

  return element
}

const Image = styled.img`
  height: 100%;
  width: 100%;
`

const Element = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: ${props => props.props.fontSize}px;
  color: ${props => props.props.color};
`
