import { createContext, useContext, useEffect, useState } from 'react'
import { http } from '../helpers/http'
import { useNavigate } from 'react-router-dom'

const UserContext = createContext(null)
export const useCurrentUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const local = localStorage.getItem('userInfo')
  const [userInfo, setUserInfo] = useState(
    local ? JSON.parse(local) : undefined
  )
  let navigate = useNavigate()

  const login = async data => {
    const res = await http(
      process.env.REACT_APP_BACK_URL + '/auth/login',
      'POST',
      data
    )
    const user = {
      token: res.data.token,
      id: res.data.user.id,
      name: res.data.user.name,
    }
    setUserInfo(user)
    localStorage.setItem('userInfo', JSON.stringify(user))
    if (res.data.token) {
      navigate('/principal')
    }
  }
  const logout = () => {
    setUserInfo(undefined)
    localStorage.removeItem('userInfo')
    navigate('/login')
  }

  return (
    <UserContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
