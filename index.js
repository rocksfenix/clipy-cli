#!/usr/bin/env node

const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const fileExtension = require('file-extension')

function sortVideos ({ list, key }) {
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

const run = () => {
  const proyectPath = process.cwd()
  const proyectDefaultName = path.basename(process.cwd())

  fs.readdir(proyectPath, (err, items) => {
    let DATA = {
      title: proyectDefaultName
    }

    items.forEach(file => {
      const ext = fileExtension(file)
      if (ext === 'mp4') {
        if (!DATA.videos) DATA.videos = []
        DATA.videos.push({
          title: file,
          src: `./${file}`
        })
      }
  
      if (ext === 'png' || ext === 'jpg') {
        DATA.coverImage = `./${file}`
      }
    })

    DATA.videos = sortVideos({
      list: DATA.videos,
      key: 'title'
    })

    const stringData = `<script>window.__CLIPY_DATA__ =${JSON.stringify(DATA)}</script>`
    const outdir = path.resolve(__dirname, 'app', 'dist', 'index.html')
    const outFile = path.resolve(proyectPath, 'play.html')
  
    fs.readFile(outdir, 'utf8', (err, contents) => {
        const stringApp = contents.replace('{{{DATA HERE}}}', stringData)

        fs.writeFile(outFile, stringApp, (err) => {
          if(err) {
            return console.log(err)
          }

          console.log(
            chalk.green(`${proyectDefaultName} => Compiled successfully!
              videos: ${DATA.videos.length}  
            `)
          );
      })
    })
  })
}

run()
