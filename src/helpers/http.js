export const http = async (url, method, payload) => {
  const token = JSON.parse(localStorage.getItem('userInfo'))
  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token.token,
    },
    body: payload ? JSON.stringify(payload) : undefined,
  }
  try {
    const res = await fetch(url, requestOptions)
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
