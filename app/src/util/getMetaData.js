import { getItem, setItem } from './localstorage'

const defaultCache = {
  lastIndex: 0,
  completed: [],
  autoplay: false,
  speed: 1,
  videos: []
}

const CACHE = getItem(window.__CLIPY_DATA__.title)

// Merge the data extracted from the directory
// with the cache in localStorage
let DATA = {
  ...defaultCache,
  ...window.__CLIPY_DATA__,
  ...CACHE
}

if (!CACHE) {
  setItem(DATA.title, defaultCache)
} else {
  // Merge the watched videos
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