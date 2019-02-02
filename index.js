#!/usr/bin/env node

const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const fileExtension = require('file-extension')
const openBrowser = require('react-dev-utils/openBrowser')
const { sortVideos, getStringData } = require('./util')

const run = () => {
  const proyectPath = process.cwd()
  const proyectDefaultName = path.basename(process.cwd())

  fs.readdir(proyectPath, (err, items) => {
    if (err) {
      console.log(
        chalk.red(
          `Failed read the directory: ${proyectPath}`
        )
      )
      process.exit(1)
    }
  
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

    const stringData = getStringData(DATA)
    const outdir = path.resolve(__dirname, 'app', 'dist', 'index.html')
    const outFile = path.resolve(proyectPath, 'play.html')
  
    fs.readFile(outdir, 'utf8', (err, contents) => {
      if (err) {
        console.log(
          chalk.red(`Failed the template app`)
        )
        process.exit(1)
      }

      const stringApp = contents.replace('{{{DATA HERE}}}', stringData)

      fs.writeFile(outFile, stringApp, (err) => {
        if(err) {
          console.log(
            chalk.red(`Failed the write play.html in ${proyectPath}`)
          )
          process.exit(1)
        }

        console.log(
          chalk.green(`${proyectDefaultName} => Compiled successfully!
            videos: ${DATA.videos.length}
          `)
        )

        openBrowser(outFile)
      })
    })
  })
}

run()
