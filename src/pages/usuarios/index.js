import { useEffect } from 'react'
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
    fixed: 'left',
  },
  {
    title: 'Fecha de creación',
    width: 25,
    dataIndex: 'createdAt',
    key: 'createdAt',
    fixed: 'left',
    render: date => {
      return new Date(date).toLocaleDateString('en-US') || '-'
    },
  },
  {
    title: 'Restablecer contraseña',
    key: 'operation',
    fixed: 'right',
    width: 20,
    render: ({ _id }) => (
      <div className="w-5/12 m-auto flex items-center h-5">
        <ModalEditPassword userId={_id} />
      </div>
    ),
  },
  {
    title: 'Editar',
    key: 'operation',
    fixed: 'right',
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
    fixed: 'right',
    width: 15,
    render: ({ _id, name }) => {
      return (
        <div className="w-5/12 m-auto flex items-center h-5">
          <ModalDeleteUser userId={_id} userName={name} />
        </div>
      )
    },
  },
]

export const Usuarios = () => {
  const { users, getUsers } = useUsers()

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      <div className="flex px-5 py-5 justify-between">
        <h1 className="text-blue-500 text-3xl font-semibold ">Usuarios</h1>
        <ModalUser />
      </div>
      <div className="px-5">
        <div className="flex justify-between">
          <div className="w-9/12">
            <Search placeholder="Escribe el usuario aquí" />
          </div>
          <div className="ml-5 w-3/12">
            <Button type="primary" text="Buscar" />
          </div>
        </div>
        <div className="mt-5">
          <Table
            rowKey={record => record._id}
            columns={columns}
            dataSource={users}
            pagination={{
              hideOnSinglePage: true,
            }}
          />
        </div>
      </div>
    </div>
  )
}
