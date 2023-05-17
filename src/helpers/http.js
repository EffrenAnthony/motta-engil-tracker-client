export const http = async (url, method, payload) => {
  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload ? JSON.stringify({ data: payload }) : undefined,
  }
  try {
    const res = await fetch(url, requestOptions)
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
