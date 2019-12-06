import styled from 'styled-components/macro'

const Button = styled.span`
  height: ${props => (props.side === 'Y' ? '100%' : '50px')};
  width: ${props => (props.side === 'X' ? '100%' : '50px')};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: xxx-large;
`
export default Button
