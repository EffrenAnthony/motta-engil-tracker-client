import { Dropdown, Menu, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { Input } from '../../common/Input'
import { Table } from 'antd'
import { Button } from '../../common/Button'
// tabla
import { Form, Popconfirm } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'

//Fin tabla
export const Configuracion = () => {
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
      // title: 'Material',
      dataIndex: 'material',
      width: '70%',
      editable: false,
    },
    {
      // title: '',
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

  return (
    <div>
      <div className="flex justify-start items-center content-center">
        <h1 className="text-blue-500 text-3xl font-semibold px-5 py-5">
          Configuracion
        </h1>
      </div>
      <div className="flex justify-between w-12/12 mb-5">
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
      </div>
      <div className="flex justify-between w-12/12 mt-5">
        <div className=" w-6/12">
          <div className="w-9/12 px-5">
            <div className="w-full flex justify-between mr-5">
              <h2 className="mr-5">Agregar material</h2>
              <span className="w-4/12">
                <Input type="text" placeholder="Escribe material" />
              </span>
              <span className="w-2/12">
                <Button
                  text="Agregar"
                  onClick={handleAdd}
                  type="secondary"
                  style={{
                    marginBottom: 16,
                  }}
                ></Button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-6/12 shadow-lg shadow-blue-500/50  rounded mr-5 mt-10 ml-5">
        <Table
          components={components}
          // rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    </div>
  )
}

// export default App;
