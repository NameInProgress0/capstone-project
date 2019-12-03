import React from 'react'
import styled from 'styled-components/macro'

export default function(props) {
  let element = ''
  if (props.el instanceof File) {
    element = (
      <Image
        {...props}
        src={URL.createObjectURL(props.el)}
        data-dragevent="move"
      />
    )
  } else {
    element = (
      <Div {...props} data-dragevent="move" draggable>
        {props.text}
      </Div>
    )
  }

  return element
}

const Image = styled.img`
  height: 100%;
  width: 100%;
`

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 100%;
`