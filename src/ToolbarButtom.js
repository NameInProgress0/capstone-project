import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import Toolbar, { Label } from './ToolbarStyle'
import MoveButton from './MoveElementButton'

export default function({ selectElement, addElement, elements, setElements }) {
  const [color, setColor] = useState('#ffffff')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [rotate, setRotate] = useState(0)
  const [fontSize, setFontSize] = useState(16)

  function addTextElement() {
    addElement({
      key: 'el' + String(Math.random()).replace('.', ''),
      type: 'Text',
      selected: false,
      props: {
        height: 19.2,
        width: 102,
        top: 30,
        left: 60,
        rotate: 0,
        text: 'Your Text Here',
        fontSize: 16,
        color: '#000000',
        background: 'transparent'
      }
    })
  }

  useEffect(() => {
    if (selectElement !== 0) {
      const { rotate, fontSize, color, background } = elements.filter(
        item => item.key === selectElement
      )[0].props
      setRotate(rotate)
      setColor(color)
      setFontSize(fontSize)
      setBackgroundColor(background)
    }
  }, [selectElement, elements])

  function moveElement() {
    if (selectElement !== 0) {
      const index = elements.findIndex(item => item.key === selectElement)

      setElements([
        ...elements.slice(0, index),
        {
          ...elements[index],
          props: {
            ...elements[index].props,
            top: elements[index].props.top + 1
          }
        },
        ...elements.slice(index + 1)
      ])
    }
  }

  function handleColor(event) {
    if (selectElement !== 0) {
      const index = elements.findIndex(item => item.key === selectElement)

      if (elements[index].type === 'Text') {
        setElements([
          ...elements.slice(0, index),
          {
            ...elements[index],
            props: { ...elements[index].props, color: event.target.value }
          },
          ...elements.slice(index + 1)
        ])
      }
    }
  }

  function handleFontSize(event) {
    if (selectElement !== 0) {
      const el = document.querySelector('#' + selectElement)
      el.style.height = 'auto'
      el.style.width = 'auto'
      el.firstChild.style.fontSize = event.target.value + 'px'
      const { width, height } = el.getBoundingClientRect()
      const index = elements.findIndex(item => item.key === selectElement)

      if (elements[index].type === 'Text') {
        setElements([
          ...elements.slice(0, index),
          {
            ...elements[index],
            props: {
              ...elements[index].props,
              fontSize: event.target.value,
              height: height,
              width: width
            }
          },
          ...elements.slice(index + 1)
        ])
      }
    }
  }

  function handleRotate(event) {
    if (selectElement !== 0) {
      const index = elements.findIndex(item => item.key === selectElement)

      if (elements[index].type === 'Text') {
        setElements([
          ...elements.slice(0, index),
          {
            ...elements[index],
            props: { ...elements[index].props, rotate: event.target.value }
          },
          ...elements.slice(index + 1)
        ])
      }
    }
  }

  function handleBackgroundColor(event) {
    if (selectElement !== 0) {
      const index = elements.findIndex(item => item.key === selectElement)

      if (elements[index].type === 'Text') {
        setElements([
          ...elements.slice(0, index),
          {
            ...elements[index],
            props: { ...elements[index].props, background: event.target.value }
          },
          ...elements.slice(index + 1)
        ])
      }
    }
  }

  return (
    <Toolbar side="bottom">
      <CreateTextElement onClick={addTextElement}>
        +<br />
        Text
      </CreateTextElement>
      <Label>
        <br />
        Text Color
        <Input type="color" onChange={handleColor} value={color} />
      </Label>
      <Label>
        <br />
        Font Size
        <Input type="number" value={fontSize} onChange={handleFontSize} />
      </Label>
      <MoveButton side="Y" onClick={moveElement}>
        &darr;
      </MoveButton>
      <Label>
        <br />
        Rotate
        <Input
          type="number"
          value={rotate || 0}
          onChange={handleRotate}
          min="-360"
          max="360"
        />
      </Label>
      <Label>
        Background Color
        <Input
          type="color"
          value={backgroundColor}
          onChange={handleBackgroundColor}
        />
      </Label>
    </Toolbar>
  )
}

const CreateTextElement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50px;
`

const Input = styled.input`
  width: 100%;
`
