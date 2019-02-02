// Return readable title
// converts 01-video-example.mp4 => 01 video example
export default (dirtyTitle) => {
  return dirtyTitle
    .replace(/\-/g, ' ')
    .replace(/\..{3}/g, '')
}
