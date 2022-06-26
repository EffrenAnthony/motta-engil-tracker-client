import { Dropdown, Menu, Space, Popconfirm, Form } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { Input } from '../../common/Input'
import { Table } from 'antd'
import { Button } from '../../common/Button'
import React, { useContext, useEffect, useRef, useState } from 'react'

export const Editor = () => {
  const menu = (
    <Menu
      items={[
        {
          label: <a href="#">Punto</a>,
          key: '0',
        },
        {
          label: <a href="#">Linea</a>,
          key: '1',
        },
      ]}
    />
  )

  //Tabla
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

  const EditableCell = ({
    title,
    editable,
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

    const save = async () => {
      try {
        const values = await form.validateFields()
        toggleEdit()
        handleSave({ ...record, ...values })
      } catch (errInfo) {
        console.log('Save failed:', errInfo)
      }
    }

    let childNode = children

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      )
    }

    return <td {...restProps}>{childNode}</td>
  }

  //config tabla
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      material: 'Edward King 0',
    },
    {
      key: '1',
      material: 'Edward King 1',
    },
  ])
  const [count, setCount] = useState(2)

  const handleDelete = key => {
    const newData = dataSource.filter(item => item.key !== key)
    setDataSource(newData)
  }

  const defaultColumns = [
    {
      title: 'Latitud',
      dataIndex: 'material',
      width: '30%',
      editable: false,
    },
    {
      title: 'Latitud',
      dataIndex: 'material',
      width: '30%',
      editable: false,
    },
    {
      title: 'Longitud',
      dataIndex: 'material',
      width: '30%',
      editable: false,
    },
    {
      title: 'Longitud',
      dataIndex: 'material',
      width: '30%',
      editable: false,
    },
    {
      title: 'Acción',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Seguro que desea eliminar el material?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ]

  const handleAdd = () => {
    const newData = {
      key: count,
      material: `${count}`,
    }
    setDataSource([...dataSource, newData])
    setCount(count + 1)
  }

  const handleSave = row => {
    const newData = [...dataSource]
    const index = newData.findIndex(item => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, { ...item, ...row })
    setDataSource(newData)
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  }
  const columns = defaultColumns.map(col => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    }
  })

  // const columns = [
  //   {
  //     title: 'Punto',
  //     dataIndex: 'name',
  //     width: 150,
  //   },
  //   {
  //     title: 'Latitud',
  //     dataIndex: 'age',
  //     width: 150,
  //   },
  //   {
  //     title: 'Longitud',
  //     dataIndex: 'address',
  //   },
  // ]
  // const data = []

  // for (let i = 0; i < 100; i++) {
  //   data.push({
  //     key: i,
  //     name: `prueba ${i}`,
  //     age: `-16,2532674${i}`,
  //     address: `-71,6822174${i}`,
  //   })
  // }
  return (
    <div>
      <div className="flex justify-start items-center content-center">
        <h1 className="text-blue-500 text-3xl font-semibold px-5 py-5">
          Editor de puntos y lineas
        </h1>
        <div className="w-5/12">
          <span className="mr-4 text-sl font-semibold">Tipo</span>
          <span className="border border-blue-500 rounded px-2 py-1">
            <Dropdown overlay={menu} trigger={['click']}>
              <Space>
                Selecciona una opción
                <DownOutlined />
              </Space>
            </Dropdown>
          </span>
        </div>
      </div>
      <div className="flex justify-between w-12/12">
        <div className=" w-6/12">
          <div className="flex justify-between w-12/12 px-5">
            <div className="w-full mr-5">
              <label>Latitud</label>
              <Input type="text" placeholder="Escribe latitud" />
              <label>Longitud</label>
              <Input placeholder="Escribe longitud" />
            </div>
            <div className="w-full">
              <label>Nombre</label>
              <Input placeholder="Escribe nombre" />
              <label>Ícono</label>
              <Input />
            </div>
          </div>
          <div className="flex justify-between w-12/12 px-5">
            <div className="w-full mr-5">
              <label>Latitud</label>
              <Input type="text" placeholder="Escribe latitud" />
              <label>Longitud</label>
              <Input placeholder="Escribe longitud" />
            </div>
            <div className="w-full">
              <label>Latitud</label>
              <Input placeholder="Escribe latitud" />
              <label>Longitud</label>
              <Input placeholder="Escribe longitud" />
            </div>
          </div>
          <div className="flex justify-between px-5">
            <div className="w-4/12 mr-5">
              <Button
                text="Agregar"
                onClick={handleAdd}
                type="secondary"
                style={{
                  marginBottom: 16,
                }}
              ></Button>
            </div>
            <div className="w-4/12 mr-5">
              <Button type="secondary" text="Cargar Excel" />
            </div>
            <div className="w-4/12 ">
              <Button type="warning" text="Descargar Excel" />
            </div>
          </div>
        </div>
        <div className="w-6/12 shadow-lg shadow-blue-500/50  rounded mr-5">
          <Table
            components={components}
            // rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
        </div>
      </div>
    </div>
  )
}
