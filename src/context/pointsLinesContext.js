import { createContext, useContext, useEffect, useState } from 'react'
import { http } from '../helpers/http'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

const PointsLinesContext = createContext(null)
export const usePointsLines = () => useContext(PointsLinesContext)

export const PointsLinesProvider = ({ children }) => {
  const [points, setPoints] = useState([])
  const [lines, setLines] = useState([])
  const [pointSelected, setPointSelected] = useState(true)
  const [messageApi, contextHolder] = message.useMessage()

  const getPoints = async () => {
    const res = await http(
      process.env.REACT_APP_BACK_URL + '/points/?filters[type][$eq]=point',
      'GET'
    )
    setPoints(res.data)
  }

  const getLines = async () => {
    const res = await http(
      process.env.REACT_APP_BACK_URL + '/points/?filters[type][$eq]=line',
      'GET'
    )

    setLines(res.data)
  }

  const createPoint = async point => {
    try {
      const res = await http(
        process.env.REACT_APP_BACK_URL + '/points',
        'POST',
        point
      )
      if (res.msg == 'error') {
        message.success('error')
      } else {
        message.destroy('savePoint')
        message.success('Punto creado')
        getPoints()
      }
    } catch (e) {
      console.log('catch', error)
    }
  }

  const editPoint = async point => {
    try {
      const res = await http(
        process.env.REACT_APP_BACK_URL + '/points/' + point.id,
        'PUT',
        point
      )
      if (res.msg == 'error') {
        message.error('error')
      } else {
        message.destroy('savePoint')
        message.success('Punto actualizado satisfactoriamente.')
        getPoints()
      }
    } catch (e) {
      console.log('catch', error)
    }
  }
  const createLine = async line => {
    try {
      const res = await http(
        process.env.REACT_APP_BACK_URL + '/points',
        'POST',
        line
      )
      if (res.msg == 'error') {
        message.success('error')
      } else {
        message.destroy('saveLine')
        message.success('Linea creada')
        getLines()
      }
    } catch (e) {
      console.log('catch', error)
    }
  }

  const editLine = async line => {
    try {
      const res = await http(
        process.env.REACT_APP_BACK_URL + '/points/' + line.id,
        'PUT',
        line
      )
      if (res.msg == 'error') {
        message.success('error')
      } else {
        message.destroy('saveLine')
        message.success('Linea actualizada satisfactoriamente')
        getLines()
      }
    } catch (e) {
      console.log('catch', error)
    }
  }

  const deletePoint = async point => {
    try {
      const res = await http(
        process.env.REACT_APP_BACK_URL + '/points/' + point,
        'DELETE'
      )
      if (res.msg == 'error') {
        message.error(res.data)
      } else {
        message.success('Punto eliminado')
        getPoints()
      }
    } catch (e) {
      console.log('catch', error)
    }
  }

  const deleteLine = async line => {
    try {
      const res = await http(
        process.env.REACT_APP_BACK_URL + '/points/' + line,
        'DELETE'
      )
      if (res.msg == 'error') {
        message.success(res.data)
      } else {
        message.success('Linea eliminada')
        getLines()
      }
    } catch (e) {
      console.log('catch', error)
    }
  }

  const pickLine = () => setPointSelected(false)

  useEffect(() => {
    getPoints()
    getLines()
  }, [])
  return (
    <PointsLinesContext.Provider
      value={{
        points,
        lines,
        getPoints,
        getLines,
        createPoint,
        createLine,
        deletePoint,
        deleteLine,
        pickLine,
        editPoint,
        editLine,
      }}
    >
      {children}
    </PointsLinesContext.Provider>
  )
}
