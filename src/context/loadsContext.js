import { createContext, useContext, useEffect, useState } from 'react'
import { http } from '../helpers/http'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

const LoadsContext = createContext(null)
export const useLoads = () => useContext(LoadsContext)

export const LoadProvider = ({ children }) => {
  const [Load, setLoad] = useState([])
  const getLoad = async () => {
    const res = await http(process.env.REACT_APP_BACK_URL + '/loads', 'GET')
    console.log(res.data.result)
    setLoad(res.data.result)
  }

  const createLoad = async Load => {
    try {
      const res = await http(
        process.env.REACT_APP_BACK_URL + '/loads',
        'POST',
        Load
      )
      if (res.msg == 'error') {
        message.error(res.data)
      } else {
        message.success('Carga creada')
        getLoad()
      }
    } catch (e) {
      console.log('catch', error)
    }
  }
  const deleteLoad = async id => {
    try {
      const res = await http(
        process.env.REACT_APP_BACK_URL + '/loads/' + id,
        'DELETE'
      )
      if (res.msg == 'error') {
        message.error(res.data)
      } else {
        message.success('Carga eliminada')
        getLoad()
      }
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getLoad()
  }, [])
  console.log(Load)
  return (
    <LoadsContext.Provider value={{ Load, createLoad, deleteLoad }}>
      {children}
    </LoadsContext.Provider>
  )
}
