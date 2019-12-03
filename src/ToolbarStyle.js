import styled from 'styled-components/macro'

export default styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
      default:
        console.log('You have to set a Toolbarside [top/left/right/bottom]')
    }
  }}
`
