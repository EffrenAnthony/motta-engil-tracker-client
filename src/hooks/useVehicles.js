import { useState, useEffect } from 'react'
import { http } from '../helpers/http'

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState([])
  const getVehicles = async () => {
    const res = await http(
      process.env.REACT_APP_BACK_URL + '/location/tracker',
      'GET'
    )
    setVehicles(res.data.result)
  }
  useEffect(() => {
    getVehicles()
  }, [])
  console.log(vehicles)
  return { vehicles }
}
