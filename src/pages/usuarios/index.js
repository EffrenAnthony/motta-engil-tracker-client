import { Input } from 'antd'
import { Switch, Table } from 'antd'
import { useState } from 'react'
import ICONPASS from '../../assets/images/password.svg'
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
    width: 50,
    dataIndex: 'user',
    key: 'user',
    fixed: 'left',
  },
  {
    title: 'Fecha de creación',
    width: 20,
    dataIndex: 'createdAt',
    key: 'createdAt',
    fixed: 'left',
    render: date => {
      return new Date(date).toLocaleDateString('en-US') || '-'
    },
  },
  {
    title: 'Reestrablecer contraseña',
    key: 'operation',
    fixed: 'right',
    width: 15,
    render: () => (
      <div className="w-5/12 m-auto flex items-center h-5">
        <ModalEditPassword />
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
      console.log('aqui', _id, name)
      return (
        <div className="w-5/12 m-auto flex items-center h-5">
          <ModalDeleteUser userId={_id} userName={name} />
        </div>
      )
    },
  },
]

export const Usuarios = () => {
  const [fixedTop, setFixedTop] = useState(false)
  const { users } = useUsers()
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
            columns={columns}
            dataSource={users}
            scroll={{
              x: 1500,
            }}
            summary={() => (
              <Table.Summary fixed={fixedTop ? 'top' : 'bottom'}>
                {/* <Table.Summary.Row>
                  <Table.Summary.Cell
                    index={0}
                    colSpan={2}
                  ></Table.Summary.Cell>
                </Table.Summary.Row> */}
              </Table.Summary>
            )}
            sticky
          />
        </div>
      </div>
    </div>
  )
}
