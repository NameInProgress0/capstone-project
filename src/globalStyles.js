import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
}

  body {
    height: 100vh;
    width:100vw;
    margin: 0;

    display: flex;
    justify-content: center;
    align-items: center;
}   
`
export default GlobalStyle
