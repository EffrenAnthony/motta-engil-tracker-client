import { createContext, useContext, useEffect, useState } from 'react'
import { http } from '../helpers/http'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { isCompositeComponent } from 'react-dom/test-utils'
import moment from 'moment'

const LocationsContext = createContext(null)
export const useLocations = () => useContext(LocationsContext)

export const LocationsProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([])
  const [history, setHistory] = useState([])
  const [vehicleSelected, setVehicleSelected] = useState(false)

  const fillVehiclesLastRecord = data => {
    const obj = {}
    data.forEach(v => {
      if (!obj[v.attributes.userid]) obj[v.attributes.userid] = v.attributes
    })
    return Object.values(obj)
  }

  const getVehicles = async ({ userId }) => {
    let filterUserId = userId ? '&filters[userId][$eq]=' + userId : ''
    try {
      const res = await http(
        process.env.REACT_APP_BACK_URL +
          `/locations?sort=timestamp:desc${filterUserId}`, // id
        'GET'
      )
      setVehicles(fillVehiclesLastRecord(res.data))
    } catch (error) {
      console.log('Error: ', error)
    }
  }
  const getHistory = async ({
    userId,
    startDate,
    endDate,
    startHour,
    endHour,
  }) => {
    const timeStart = new Date(
      `${
        startDate.getMonth() + 1
      }/${startDate.getDate()}/${startDate.getFullYear()} ${
        startHour.split(':')[0]
      }:${startHour.split(':')[1]}`
    ).getTime()
    const timeEnd = new Date(
      `${
        endDate.getMonth() + 1
      }/${endDate.getDate()}/${endDate.getFullYear()} ${
        endHour.split(':')[0]
      }:${endHour.split(':')[1]}`
    ).getTime()
    const res = await http(
      process.env.REACT_APP_BACK_URL +
        `/locations?filters[userid][$eq]=${userId}&filters[timestamp][$gte]=${timeStart}&filters[timestamp][$lte]=${timeEnd}`,
      'GET'
    )

    let parseFormat = []
    res.data.forEach(r => {
      const order = [
        'carga',
        'iniciarConduccion',
        'finConduccion',
        'descarga',
        'inicioRetorno',
        'finRetorno',
      ]
      const tmp = order.map(step => ({ ...r.attributes.data[step], step }))
      parseFormat = [...parseFormat, ...tmp]
    })
    console.log(parseFormat)

    setHistory(parseFormat)
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
