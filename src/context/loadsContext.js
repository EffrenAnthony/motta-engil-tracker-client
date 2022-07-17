import { createContext, useContext, useEffect, useState } from 'react'
import { http } from '../helpers/http'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

const LoadsContext = createContext(null)
export const useLoads = () => useContext(LoadsContext)

export const LoadProvider = ({ children }) => {
  const [loads, setLoads] = useState([])
  const getLoads = async () => {
    const res = await http(process.env.REACT_APP_BACK_URL + '/loads', 'GET')
    console.log('respuesta loads',res.data.result)
    setLoads(res.data.result)
  }

  const createLoad = async load => {
    try {
      const res = await http(
        process.env.REACT_APP_BACK_URL + '/loads',
        'POST',
        {material:load}
      )
      if (res.msg == 'error') {
        message.error(res.data)
      } else {
        message.success('Carga creada')
        getLoads()
      }
    } catch (e) {
      console.log('catch', error)
    }
  }
  const deleteLoad = async load => {
    try {
      const res = await http(
        process.env.REACT_APP_BACK_URL + '/loads/' + load,
        'DELETE'
      )
      if (res.msg == 'error') {
        message.error(res.data)
      } else {
        message.success('Carga eliminada')
        getLoads()
      }
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getLoads()

  }, [])
  console.log('loads',loads)
  return (
    <LoadsContext.Provider value={{ loads, createLoad, deleteLoad  }}>
      {children}
    </LoadsContext.Provider>
  )
}
