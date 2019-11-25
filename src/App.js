import React, { useState } from 'react'

import styled from 'styled-components/macro'


function App({width, height, depth}) {
  
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

  const scale = getScale(cartonDimensions);
 
  return (
    <Wrapper>
      <Toolbar side="top">
        <CartonDimension side="top">{(cartonDimensions.height * pxCalc.pxTocm).toFixed(2)} cm</CartonDimension>
      </Toolbar>
      <Toolbar side="left">
        <CartonDimension side="left">{(cartonDimensions.width * pxCalc.pxTocm).toFixed(2)} cm</CartonDimension>
      </Toolbar>
      <Board>
        <Carton height={cartonDimensions.height * scale} width={cartonDimensions.width * scale}/>
      </Board>
      <Toolbar side="right" />
      <Toolbar side="bottom" />
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

const Toolbar = styled.section`
  ${props => {
    switch (props.side) {
      case 'top':
        return 'grid-area: 1/1/2/4; '
      case 'left':
        return 'grid-area: 2/1/3/2; '
      case 'right':
        return 'grid-area: 2/3/3/4;'
      case 'bottom':
        return 'grid-area: 3/1/4/4; '
    }
  }}
  position: relative;
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
  if (props.side === 'top'){
      return(
        `
        width: 100%;
        top:100%;
        `
      )
  } else {
    return (
      `
      width: 600%;
      top:50%;
      transform: rotate(-90deg);
      left:-185%;
      `
    )
  }
}}

margin: 0;
position: absolute;
text-align: center;
`


const Carton = styled.section`
  height:${props => props.height}px;
  width:${props => props.width}px;
  max-height: 80%;
  max-width: 80%;
  position: relative;
  background-color: saddlebrown;
  overflow: hidden;
  border-color: black;
  border-style: solid;
  border-width: 1px;
`
function getScale(cartonDimensions){

let scale = ((window.innerHeight - 140) * 0.8) / cartonDimensions.height

  if(window.innerWidth- 140 < cartonDimensions.width * scale){

    scale = ((window.innerWidth - 140) * 0.8) / cartonDimensions.width
}
return scale
}