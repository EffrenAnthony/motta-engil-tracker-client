var myHeaders = new Headers()
myHeaders.append(
  'Authorization',
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2YyZjcwODFlN2MyZGMzNjFjNjU5NCIsIm5hbWUiOiJBZG1pbiIsImlhdCI6MTY1Mjc1ODQ3NSwiZXhwIjozMzA2MTIxNzUwfQ.WMwH3cMjzEbhlF-CSf2Egwwvb7Bhry9iAccOsIv3oKo'
)

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
}

export const getMarkers = async () => {
  const res = await fetch(
    process.env.REACT_APP_BACK_URL + '/location/tracker',
    requestOptions
  )
  const data = await res.json()
  return data.data.result
}
