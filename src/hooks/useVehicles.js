import { useState, useEffect } from 'react'
import { http } from '../helpers/http'

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState([])
  const [history, setHistory] = useState([])
  const getVehicles = async () => {
    const res = await http(
      process.env.REACT_APP_BACK_URL + '/location/tracker',
      'GET'
    )
    setVehicles(res.data.result)
  }
  const getHistory = async userId => {
    const result = await http(
      process.env.REACT_APP_BACK_URL + '/location?filter=' + userId,
      'GET'
    )
    console.log(result)
    setHistory(result.data.result)
  }
  useEffect(() => {
    getVehicles()
  }, [])
  console.log(vehicles)
  return { vehicles, getHistory, history }
}
