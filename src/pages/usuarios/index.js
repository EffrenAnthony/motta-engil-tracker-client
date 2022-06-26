import { Input } from 'antd'
import { Switch, Table } from 'antd'
import { useState } from 'react'
import ICONPASS from '../../assets/images/password.svg'
import ICONEDIT from '../../assets/images/edit.svg'
import ICONDELETE from '../../assets/images/delete.svg'
import { ModalUser } from '../../common/Modal'
import { Button } from '../../common/Button'
import { ConfirmModal } from '../../common/ConfirmModal'

const { Search } = Input
const columns = [
  {
    title: 'Nombre de usuario',
    width: 50,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Fecha de creación',
    width: 50,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  {
    title: 'Reestrablecer contraseña',
    key: 'operation',
    fixed: 'right',
    width: 20,
    render: () => (
      <div className="h-full w-5/12 m-auto flex items-center h-5">
        <Button
          text={<img className="w-5/12 m-auto h-5" src={ICONPASS} />}
          type="primary"
        />
      </div>
    ),
  },
  {
    title: 'Editar',
    key: 'operation',
    fixed: 'right',
    width: 20,
    render: () => (
      <div className="h-full w-5/12 m-auto flex items-center h-5">
        <Button
          text={<img className="w-5/12 m-auto h-5" src={ICONEDIT} />}
          type="warning"
        />
      </div>
    ),
  },
  {
    title: 'Eliminar usuario',
    key: 'operation',
    fixed: 'right',
    width: 20,
    render: () => (
      <div className="h-full w-5/12 m-auto flex items-center h-5">
        <Button
          text={<img className="w-5/12 m-auto h-5" src={ICONDELETE} />}
          type="danger"
        />
      </div>
    ),
  },
]
const data = []

for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 2000 + i,
    address: `London Park no. ${i}`,
  })
}

export const Usuarios = () => {
  const [fixedTop, setFixedTop] = useState(false)
  return (
    <div>
      <div className="flex px-5 py-5 justify-between">
        <h1 className="text-blue-500 text-3xl font-semibold ">Usuarios</h1>
        <ModalUser></ModalUser>
        <ConfirmModal />
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
            dataSource={data}
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
