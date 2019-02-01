import styled from 'styled-components'

const VideoItem = styled.li`
  list-style: none;
  cursor: pointer;
  padding: 0.3em;
  font-size: 22px;
  background: ${p => p.active ? '#b07de3' : '#FFF'};
  transition: all 250ms ease-out;
  border-radius: 0.3em;
  opacity: ${p => p.completed ? '0.5' : '1'};

  :hover {
    background: yellow;
  }
`

export default VideoItem
