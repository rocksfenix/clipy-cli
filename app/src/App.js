import React from 'react'
import Plyr from 'plyr'
import { ToastContainer, toast } from 'react-toastify'
import { getItem, setItem } from './util/localstorage'
import DATA from './util/getMetaData'
import VideoItem from './components/VideoItem'
import CoverImage from './components/CoverImage'
import Info from './components/Info'
import 'react-toastify/dist/ReactToastify.css'

class App extends React.Component {

  state = {
    title: DATA.title,
    coverImage: DATA.coverImage,
    videos: DATA.videos,
    videoInFocus: DATA.videos[0],
    activeIndex: 0
  }

  video = React.createRef()

  componentDidMount () {
    const { videoInFocus } = this.state
    const source = {
      type: 'video',
      title: videoInFocus.title,
      sources: [
        {
          src: videoInFocus.src,
          type: 'video/mp4',
          size: 720
        }
      ]
    }

    this.player = new Plyr(this.video.current)
    this.player.autoplay = true
    this.player.source = source
    this.player.on('ended', this.handleEnded)
    this.htmlEl = document.getElementsByTagName('html')[0]
  }

  handleEnded = (e) => {
    this.setState(state => {
      const activeIndex = state.activeIndex + 1
      const cache = getItem(state.title)

      if (activeIndex === state.videos.length) {
        return alert('Completed the playlist!')
      }

      setItem(state.title, {
        ...cache,
        completed: [
          ...cache.completed,
          state.videoInFocus.title
        ]
      })

      // Show Notification
      toast.info(`🦄 ${state.videos[activeIndex].title}`, {
        position: 'top-right',
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
  
      return {
        ...state,
        activeIndex: activeIndex,
        videoInFocus: state.videos[activeIndex],
        videos: state.videos.map(video => {
          if (video.title === state.videoInFocus.title) {
            return {
              ...video,
              completed: true
            }
          }
          return video
        })
      }
    }, this.updateVideoPlayer)
  }

  updateVideoPlayer = () => {
    this.player.source = {
      type: 'video',
      title: this.state.videoInFocus.title,
      sources: [
        {
          src: this.state.videoInFocus.src,
          type: 'video/mp4',
          size: 720
        }
      ]
    }
  }

  selectVideo = (videoInFocus, activeIndex) => {
    this.setState({
      videoInFocus, activeIndex
    }, this.updateVideoPlayer)
  
    // TODO: handle scroll behavior via checkbox
    // this.htmlEl.scrollTop = 0
  }

  toggleCompleted = (touchedVideo, index, event) => {
    event.preventDefault()

    this.setState(state => {
      // I get the cache from localstorage
      const cache = getItem(state.title)
      const videoTitle = touchedVideo.title

      // Update the cache in localStorage
      if (cache) {
        if (cache.completed.indexOf(videoTitle) !== -1) {
          // Remove if exist
          setItem(state.title, {
            ...cache,
            completed: cache.completed.filter(c => c !== videoTitle)
          })
        } else {
          // Push if do not exist
          setItem(state.title, {
            ...cache,
            completed: [
              ... cache.completed, videoTitle
            ]
          })
        }
      }

      const newStatus = !touchedVideo.completed
  
      return {
        ...state,
        videos: state.videos.map(video => {
          if (video.title === videoTitle) {
            return {
              ...video,
              completed: newStatus
            }
          }
          return video
        })
      }
    })
  }

  render () {
    const { videoInFocus, videos, coverImage, title } = this.state
    return (
      <div>
        <video ref={this.video}>
          <source type='video/mp4' />
        </video>
        <Info>
          <CoverImage src={coverImage}/>
          <div>{ title }</div> > 
          <div>{ videoInFocus.title }</div>
        </Info>
        <ul>
          { videos.map((video, index) => (
            <VideoItem
              onClick={this.selectVideo.bind(this, video, index)}
              onContextMenu={this.toggleCompleted.bind(this, video, index)}
              active={videoInFocus.title === video.title}
              completed={video.completed}
              key={video.title}
            >
              { video.title }
            </VideoItem>
          )) }
        </ul>
        <ToastContainer />
      </div>
    )
  }
}

export default App