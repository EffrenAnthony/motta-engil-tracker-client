import { createContext, useContext, useEffect, useState } from 'react'
import { Modal, message } from 'antd'
import { http } from '../helpers/http'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../helpers/token'

const AuthContext = createContext(null)
export const useCurrentUser = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const local = getToken()
  const [userInfo, setUserInfo] = useState(local)
  let navigate = useNavigate()

  const login = async data => {
    try {
      const res = await http(
        process.env.REACT_APP_BACK_URL +
          `/app-users?filters[user][$eq]=${data.user}&filters[pass][$eq]=${data.pass}&filters[role][$eq]=web`,
        'GET'
      )
      if (res.data.length == 0)
        message.error('Hubo un error con las credenciales')
      else {
        const user = {
          id: res.data[0].id,
          name: res.data[0].attributes.name,
          email: res.data[0].attributes.email,
          user: res.data[0].attributes.user,
        }
        setUserInfo(user)
        localStorage.setItem('userInfo', JSON.stringify(user))
        if (res.data[0].id) navigate('/principal')
      }
    } catch (error) {
      message.error('Hubo un error con las credenciales')
    }
  }
  const logout = () => {
    setUserInfo(undefined)
    localStorage.removeItem('userInfo')
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
