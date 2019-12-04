import React from 'react'
import styled from 'styled-components/macro'
import Toolbar from './ToolbarStyle'
import MoveButton from './MoveElementButton'

export default function({ selectElement, setSelectElement, addElement }) {
  function addTextElement() {
    addElement({
      key: Math.random(),
      dataEl: 'Text',
      text: 'Your Text Here',
      width: 'auto',
      height: 'auto',
      top: 30,
      left: 50,
      rotate: 0,
      fontSize: 16,
      selected: false
    })
  }
  function moveElement() {
    if (
      selectElement !== null &&
      selectElement.getAttribute('data-el') !== 'Carton'
    ) {
      const elPos = selectElement.getBoundingClientRect()
      const carPos = selectElement.parentElement.getBoundingClientRect()

      selectElement.style.top = elPos.top - carPos.top + 1 + 'px'
    }
  }
  function handleColor(event) {
    if (
      selectElement !== null &&
      selectElement.getAttribute('data-el') === 'Text'
    ) {
      selectElement.firstChild.style.color = event.target.value
    }
  }
  function handleFontSize(event) {
    if (
      selectElement !== null &&
      selectElement.getAttribute('data-el') === 'Text'
    ) {
      const el = selectElement
      el.firstChild.style.fontSize = event.target.value + 'px'
      setSelectElement(el)
    }
  }

  function handleRotate(event) {
    if (
      selectElement !== null &&
      selectElement.getAttribute('data-el') !== 'Carton'
    ) {
      const el = selectElement
      el.style.transform = `rotate(${event.target.value}deg)`
      setSelectElement(el)
    }
  }
  function handleBackgroundColor(event) {
    if (
      selectElement !== null &&
      selectElement.getAttribute('data-el') === 'Text'
    ) {
      selectElement.firstChild.style.backgroundColor = event.target.value
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
        <Input type="color" onChange={handleColor} />
      </Label>
      <Label>
        <br />
        Font Size
        <Input
          type="number"
          value={
            selectElement !== null &&
            selectElement.getAttribute('data-el') === 'Text' &&
            Number(
              selectElement.firstChild.style.fontSize.replace('px', '')
            ) !== 0
              ? Number(
                  selectElement.firstChild.style.fontSize.replace('px', '')
                )
              : 16
          }
          onChange={handleFontSize}
        />
      </Label>
      <MoveButton side="Y" onClick={moveElement}>
        &darr;
      </MoveButton>
      <Label>
        <br />
        Rotate
        <Input
          type="number"
          value={
            selectElement !== null && selectElement.style.transform !== ''
              ? Number(selectElement.style.transform.match(/\d+/)[0])
              : 0
          }
          onChange={handleRotate}
          min="-360"
          max="360"
        />
      </Label>
      <Label>
        Background Color
        <Input type="color" onChange={handleBackgroundColor} />
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

const Label = styled.label`
  display: fles;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  display: block;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50px;
`
const Input = styled.input`
  width: 100%;
`
