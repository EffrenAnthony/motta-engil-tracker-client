export const getToken = () => {
  const item = localStorage.getItem('userInfo')
  return item ? JSON.parse(item) : null
}
