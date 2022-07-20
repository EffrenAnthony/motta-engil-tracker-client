import { createContext, useContext, useEffect, useState } from 'react'
import { http } from '../helpers/http'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { isCompositeComponent } from 'react-dom/test-utils'

const LocationsContext = createContext(null)
export const useLocations = () => useContext(LocationsContext)

export const LocationsProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([])
  const [history, setHistory] = useState([])
  const [vehicleSelected, setVehicleSelected] = useState(false)

  const getVehicles = async ({
    userId,
    // startDate,
    // endDate,
    // startHour,
    // endHour,
  }) => {
    // console.log('get  vehicles filters', filters)
    let params = userId ? 'filter=userId:' + userId : ''
    // params = startDate ? 'filter=userId:' + user : ''
    const res = await http(
      process.env.REACT_APP_BACK_URL + '/location/tracker?' + params,
      'GET'
    )
    setVehicles(res.data.result)
  }
  const getHistory = async userId => {
    const result = await http(
      process.env.REACT_APP_BACK_URL + '/location?filter=userId:' + userId,
      'GET'
    )
    setHistory(result.data.result)
  }
  const pickVehicle = () => setVehicleSelected(true)
  // useEffect(() => {
  //   getVehicles()
  // }, [])
  return (
    <LocationsContext.Provider
      value={{
        vehicles,
        history,
        vehicleSelected,
        getHistory,
        pickVehicle,
        getVehicles,
      }}
    >
      {children}
    </LocationsContext.Provider>
  )
}
