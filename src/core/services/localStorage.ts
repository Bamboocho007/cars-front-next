const setObj = (key: string, value: any) => {
  if (typeof window === 'undefined') return
  const stringifiedValue = JSON.stringify(value)
  window.localStorage.setItem(key, stringifiedValue)
}

const getObj = <T = any>(key: string): T => {
  if (typeof window === 'undefined') return null
  const value = window.localStorage.getItem(key)
  if (!value) return null
  return JSON.parse(value)
}

export const localStorageService = {
  setObj,
  getObj
}