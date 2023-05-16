import { useEffect, useState } from 'react'
import { Input } from 'antd'
import { Table } from 'antd'
import { ModalUser } from '../../common/ModalCreateUser'
import { Button } from '../../common/Button'
import { useUsers } from '../../context/usersContext'
import { ModalDeleteUser } from '../../common/ModalDeleteUser'
import { ModalEditUser } from '../../common/ModalEditUser'
import { ModalEditPassword } from '../../common/ModalEditPassword'

const { Search } = Input
const columns = [
  {
    title: 'Nombre de usuario',
    width: 40,
    dataIndex: 'user',
    key: 'user',
    // filteredValue:[''],
    // onFilter:(value,record)=>{
    //   return String(record.user).toLowerCase.includes(value.toLowerCase())
    // }
  },
  {
    title: 'Fecha de creación',
    width: 25,
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: date => {
      return new Date(date).toLocaleDateString('en-US') || '-'
    },
  },
  {
    title: 'Restablecer contraseña',
    key: 'operation',
    width: 20,
    render: ({ id }) => (
      <div className="w-5/12 m-auto flex items-center h-5">
        <ModalEditPassword userId={id} />
      </div>
    ),
  },
  {
    title: 'Editar',
    key: 'operation',
    width: 15,
    render: user => {
      return (
        <div className="w-5/12 m-auto flex items-center h-5">
          <ModalEditUser {...user} />
        </div>
      )
    },
  },
  {
    title: 'Eliminar usuario',
    key: 'operation',
    width: 15,
    render: ({ id, name }) => {
      return (
        <div className="w-5/12 m-auto flex items-center h-5">
          <ModalDeleteUser userId={id} userName={name} />
        </div>
      )
    },
  },
]

export const Usuarios = () => {
  const [searched,setSearched] = useState("")
  const { users, getUsers } = useUsers()
  console.log(users)
  useEffect(() => {
    getUsers()
  }, [])


  const searchTable = (e)=>{
    setSearched(e.target.value)
    console.log(e.target.value)
  }
  const data = users.map(item=>({...item.attributes, id:item.id}))
  return (
    <div>
      <div className="flex px-5 py-5 justify-between">
        <h1 className="text-blue-500 text-3xl font-semibold ">Usuarios</h1>
        <ModalUser />
      </div>
      <div className="px-5">
        <div className="flex justify-between">
          <div className="w-9/12">
            <Input.Search
            placeholder="Escribe el usuario aquí" 
            // onSearch={(value)=>{setSearched(value)}}
            // onChange={searchTable(e)}
            />
          </div>
          <div className="ml-5 w-3/12">
            <Button type="primary" text="Buscar" />
          </div>
        </div>
        <div className="mt-5">
          <Table
            rowKey={record => record.id}
            columns={columns}
            dataSource={data}
            pagination={{
              hideOnSinglePage: true,
            }}
            rowClassName={(_, index) =>
              index % 2 === 0 ? 'py-2' : 'bg-gray-100 py-5'
            }
            size="small"
          />
        </div>
      </div>
    </div>
  )
}
