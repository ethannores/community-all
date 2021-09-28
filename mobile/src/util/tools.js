export const LS = {
  save: (name, data) => {
    localStorage.setItem(name, JSON.stringify(data))
  },
  get: name => {
    return JSON.parse(localStorage.getItem(name))
  },
  del: name => {
    localStorage.removeItem(name)
  },
  clear: () => {
    localStorage.clear()
  },
}
