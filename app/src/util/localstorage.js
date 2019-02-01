export const getItem = (key) => {
  try {
    const str = window.localStorage.getItem(key)

    return JSON.parse(str)
  } catch {
    return null
  }
}

export const setItem = (key, value) => {
  try {
    return window.localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}