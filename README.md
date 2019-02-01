# Clipy CLI

Experimental Node CLI Tool

I have some directories with videos that I wanted to organize and to play them easy without install a video player, instead I use the browser. This CLI tool extracts information from the directory, after generates a file ``play.html`` that contains a react application along with the metadata extracted, this app render a playlist of the folder videos and a video player via ``plyr``.

The app scripts are inyected inline for convenience.



## NPM Scripts

#### npm start
Compile the ``play.html`` get the local directoy pass through ``process.cwd()``.

#### ~ ./app npm run dev
Start a dev server via webpack-dev-server

#### ~ ./app npm run build
Compile the react app to production
