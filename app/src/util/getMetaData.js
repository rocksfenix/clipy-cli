import { getItem, setItem } from './localstorage'

const defaultCache = {
  lastIndex: 0,
  completed: []
}

// Merge the data extracted from the directory
// with the cache in localStorage
const DATA = window.__CLIPY_DATA__ || { videos: [] }
const CACHE = getItem(DATA.title)

if (!CACHE) {
  setItem(DATA.title, defaultCache)
} else {
  DATA.videos = DATA.videos.map(video => {
    for(let i = 0; i < CACHE.completed.length; i++) {
      if (CACHE.completed[i] === video.title) {
        return {
          ...video,
          completed: true 
        }
      }
    }

    return {
      ...video,
      completed: false
    }
  })
}


export default DATA