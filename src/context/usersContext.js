import { createContext, useContext, useEffect, useState } from 'react'
import { http } from '../helpers/http'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

const UsersContext = createContext(null)
export const useUsers = () => useContext(UsersContext)

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const getUsers = async () => {
    const res = await http(process.env.REACT_APP_BACK_URL + '/user', 'GET')
    setUsers(res.data.result)
  }

  const createUser = async user => {
    try {
      const res = await http(
        process.env.REACT_APP_BACK_URL + '/user',
        'POST',
        user
      )
      if (res.msg == 'error') {
        message.error(res.data)
      } else {
        message.success('Usuario creado')
        getUsers()
      }
    } catch (e) {
      console.log('catch', error)
    }
  }
  const deleteUser = async id => {
    try {
      const res = await http(
        process.env.REACT_APP_BACK_URL + '/user/' + id,
        'DELETE'
      )
      if (res.msg == 'error') {
        message.error(res.data)
      } else {
        message.success('Usuario eliminado')
        getUsers()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const updatePasswordUser = async user => {
    const res = await http(
      process.env.REACT_APP_BACK_URL + '/user/' + user.id,
      'PUT',
      user
    )
  }
  const updateUser = async user => {
    const res = await http(
      process.env.REACT_APP_BACK_URL + '/user/' + user.id,
      'PUT',
      user
    )
    if (res.msg == 'error') {
      message.error(res.data)
    } else {
      message.success('Usuario actualizado correctamente')
      getUsers()
    }
  }

  return (
    <UsersContext.Provider
      value={{
        users,
        createUser,
        deleteUser,
        updateUser,
        updatePasswordUser,
        getUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}
