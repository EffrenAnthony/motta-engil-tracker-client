import { Input } from '../../common/Input'
import { Table } from 'antd'
import { Button } from '../../common/Button'
import ICONDELETE from '../../assets/images/delete.svg'

// tabla
import { Modal } from 'antd'
import React, { useState } from 'react'
import { useLoads } from '../../context/loadsContext'
import X from '../../assets/images/circle-x.png'

const { confirm } = Modal
//Fin tabla
export const Configuracion = () => {
  //Tabla
  const { loads, createLoad, deleteLoad } = useLoads()
  const [load, setLoad] = useState('')

  const columns = [
    {
      dataIndex: 'name',
      width: '80%',
    },
    {
      dataIndex: 'operation',
      render: (_, material) => (
        <Button
          text={<img className="w-12/12 m-auto h-5" src={ICONDELETE} />}
          type="danger"
          onClick={() => showConfirm(material.key)}
        />
      ),
    },
  ]

  const create = () => {
    createLoad(load)
    setLoad('')
  }

  const deleteRecord = key => {
    deleteLoad(key)
    Modal.destroyAll()
  }

  const showConfirm = key => {
    confirm({
      closable: true,
      icon: null,
      content: (
        <div>
          <p className="text-center font-semibold mb-6">
            Seguro que desea eliminar el material?
          </p>
          <div className="flex flow-row gap-2">
            <Button
              text="Si"
              type="primary"
              onClick={() => deleteRecord(key)}
            />
            <Button text="No" type="warning" onClick={Modal.destroyAll} />
          </div>
        </div>
      ),
      footer: null,
      okButtonProps: { style: { display: 'none' } },
      cancelButtonProps: { style: { display: 'none' } },
    })
  }

  return (
    <div>
      <div className="flex justify-start items-center content-center">
        <h1 className="text-blue-500 text-3xl font-semibold px-5 py-5">
          Configuracion
        </h1>
      </div>
      <div className="flex justify-between w-12/12 mt-5">
        <div className=" w-6/12">
          <div className="w-12/12 px-5">
            <div className="w-full flex justify-between mr-5 items-center align-middle">
              <div className="mr-5 font-bold h-12">Agregar material</div>
              <div className="w-4/12 h-12">
                <Input
                  value={load}
                  type="text"
                  onChange={event => {
                    setLoad(event.target.value)
                  }}
                  placeholder="Escribe material"
                />
              </div>
              <div className="w-2/12 h-12">
                <Button
                  text="Agregar"
                  onClick={create}
                  type="secondary"
                  style={{
                    marginBottom: 16,
                  }}
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/12 shadow-sm shadow-blue-500/50  rounded mr-5 mt-10 ml-5">
        <Table
          rowClassName={(_, index) => (index % 2 === 0 ? '' : 'bg-gray-100')}
          dataSource={loads.map(elem => {
            return {
              name: elem.attributes.material,
              key: elem.id,
            }
          })}
          showHeader={false}
          columns={columns}
          pagination={false}
          locale={{ emptyText: 'No hay materiales' }}
          size="small"
        />
      </div>
    </div>
  )
}
