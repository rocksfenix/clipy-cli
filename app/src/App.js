import React from 'react'
import Plyr from 'plyr'
import styled from 'styled-components'

const DATA = window.__CLIPY_DATA__ || { videos: [] }

const VideoItem = styled.li`
  list-style: none;
  cursor: pointer;
  padding: 0.3em;
  font-size: 22px;
  background: ${p => p.active ? '#b07de3' : '#FFF'};
  transition: all 250ms ease-out;
  border-radius: 0.3em;

  :hover {
    background: yellow;
  }
`

const CoverImage = styled.img`
  width: 80px;
`

const Info = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
`

class App extends React.Component {

  state = {
    videoInFocus: {
      title: 'Select the video'
    }
  }

  componentDidMount () {
    this.player = new Plyr(document.getElementById('player'));
  }

  selectVideo = (videoInFocus) => {
    this.setState({ videoInFocus })
    this.player.source = {
      type: 'video',
      sources: [
        {
          src: videoInFocus.src,
          type: 'video/mp4',
          size: 720
        }
      ]
    }

    const html = document.getElementsByTagName('html')[0]
    html.scrollTop = 0
  }

  render () {
    const { videoInFocus } = this.state
    return (
      <div>
        <video id='player'>
          <source type="video/mp4" />
        </video>
        <Info>
          <CoverImage src={DATA.coverImage}/>
          <div>{ DATA.title }</div> > 
          <div>{ videoInFocus.title }</div>
        </Info>
        
        <ul>
          { DATA.videos.map(video => (
            <VideoItem
              onClick={this.selectVideo.bind(this, video)}
              active={videoInFocus.title === video.title}
              key={video.title}
            >
              { video.title }
            </VideoItem>
          )) }
        </ul>
      </div>
    )
  }
}

export default App