export const http = async (url, method, payload) => {
  const token = JSON.parse(localStorage.getItem('userInfo'))
  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? 'Bearer ' + token.token : undefined,
    },
    body: payload ? JSON.stringify({"data":payload}) : undefined,
  }
  try {
    const res = await fetch(url, requestOptions)
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
