import { Dropdown, Menu, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { Input } from '../../common/Input'
import { Table } from 'antd'
import { Button } from '../../common/Button'
// tabla
import { Form, Popconfirm } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLoads } from '../../context/loadsContext'
import X from '../../assets/images/circle-x.png'

//Fin tabla
export const Configuracion = () => {
  //Tabla
  const { loads,createLoad, deleteLoad } = useLoads()
  const EditableContext = React.createContext(null)
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm()
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    )
  }
  const [load, setLoad] = useState('')


  const EditableCell = ({
    title,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false)
    const inputRef = useRef(null)
    const form = useContext(EditableContext)
    useEffect(() => {
      if (editing) {
        inputRef.current.focus()
      }
    }, [editing])

    const toggleEdit = () => {
      setEditing(!editing)
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      })
    }



    return <td {...restProps}>{childNode}</td>
  }

  //config tabla


  // const [count, setCount] = useState(2)

  const handleDelete = _id => {
    // const newData = dataSource.filter(item => item.key !== key)
    // setDataSource(newData)
  }

  const defaultColumns = [
    {
      // title: 'Material',
      dataIndex: 'name',
      width: '70%',
    },
    {
      // title: '',
      dataIndex: 'operation',
      render: (_,material) =>
          <Popconfirm
            title="Seguro que desea eliminar el material?"
            onConfirm={() => deleteLoad(material.key)}
          >
            <img className='h-4 w-4' src={X}/>
          </Popconfirm>
        ,
    },
  ]

  console.log('loads material',loads)

  const columns = defaultColumns.map(col => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: record => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    }
  })

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
                <Input value={load} type="text" onChange={event => {
                  setLoad(event.target.value)
                }} placeholder="Escribe material" />
              </div>
              <div className="w-2/12 h-12">
                <Button
                  text="Agregar"
                  onClick={()=> createLoad(load)}
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
      <div className="w-3/12 shadow-lg shadow-blue-500/50  rounded mr-5 mt-10 ml-5">
        <Table
          // components={components}
          // rowClassName={() => 'editable-row'}
          // bordered
          dataSource={ loads.map(elem =>{
            return {
              name: elem.material,
              key: elem.id
            }
          })}
          showHeader={false}
          columns={columns}
          pagination={false}
          locale={{ emptyText: 'No hay materiales' }}
        />
      </div>
    </div>
  )
}

// export default App;
      {/* <div className="flex justify-between w-12/12 mb-5">
        <div className=" w-6/12">
          <div className="w-8/12 px-5">
            <h2>Carga por horas</h2>
            <div className="w-full flex justify-between mr-5">
              <label className="mr-5">Hora de inicio de carga</label>
              <span className="w-4/12">
                <Input type="text" placeholder="Escribe hora" />
              </span>
            </div>
            <div className="w-full flex justify-between">
              <label className="mr-5">Hora de fin de carga</label>
              <span className="w-4/12">
                <Input placeholder="Escribe hora" />
              </span>
            </div>
          </div>
          <div className="flex justify-end px-5 w-8/12">
            <div className="w-4/12">
              <Button type="primary" text="Guardar" />
            </div>
          </div>
        </div>
      </div> */}