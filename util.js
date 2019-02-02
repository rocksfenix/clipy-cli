
const sortVideos = ({ list, key }) => {
  const pattern = /([0-9])+/g

  const map = (str) => {
    const res = str.match(pattern)
    if (res) {
      return Number(res[0])
    } else {
      return 0
    }
  }

  return list.sort((a,b) =>{
    const av = map(a[key])
    const bv = map(b[key])
    
    return av < bv ? -1 : av > bv ? 1 : 0
  })
}

const getStringData = (data) => {
  return `<script>window.__CLIPY_DATA__ =${JSON.stringify(DATA)}</script>`
}

module.exports = {
  sortVideos,
  getStringData
}