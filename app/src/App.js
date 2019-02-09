import React from 'react'
import Plyr from 'plyr'
import { ToastContainer, toast } from 'react-toastify'
import { getItem, setItem } from './util/localstorage'
import DATA from './util/getMetaData'
import VideoItem from './components/VideoItem'
import Info from './components/Info'
import 'react-toastify/dist/ReactToastify.css'

class App extends React.Component {

  state = {
    title: DATA.title || '',
    coverImage: DATA.coverImage,
    videos: DATA.videos,
    videoInFocus: DATA.videos[0],
    activeIndex: 0,
    autoplay: DATA.autoplay,
    speed: DATA.speed
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
    this.player.autoplay = this.state.autoplay
    this.player.source = source
    this.player.settings = [ 'quality', 'speed', 'loop' ]
    this.htmlEl = document.getElementsByTagName('html')[0]
    
    this.player.speed = {
      selected: this.state.speed,
      options: [ 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2 ]
    }

    // Handle player events
    this.player.on('ended', this.handleEnded)
    this.player.on('ratechange', this.changeSpeed)
    
    // Autoplay
    if (this.state.autoplay) {
      this.player.play()
    }
  }

  changeSpeed = (data) => {
    // Update in cache state and cache
    const speed = data.detail.plyr.config.speed.selected
    const { title } = this.state
    const cache = getItem(title)
    
    this.setState({ speed })
    setItem(title, {
      ...cache,
      speed
    })
  }

  handleEnded = (e) => {
    this.setState(state => {

      if (!this.state.autoplay) return
  
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

  handleAutoPLay = (autoplay) => {
    this.player.autoplay = !autoplay
    this.setState({ autoplay: !autoplay })

    const { title } = this.state
    // Set autoplay in localStorage
    const cache = getItem(title)

    setItem(title, {
      ...cache,
      autoplay: !autoplay
    })

    // Play the video when autoplay is true
    if (!autoplay) {
      this.player.play()
    }
  }

  render () {
    const { videoInFocus, videos, coverImage, title, autoplay } = this.state
  
    return (
      <div>
        <video ref={this.video}>
          <source type='video/mp4' />
        </video>
        <Info
          title={title}
          videoInFocus={videoInFocus}
          coverImage={coverImage}
          autoplay={autoplay}
          onToggleAutoPlay={this.handleAutoPLay}
        />
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