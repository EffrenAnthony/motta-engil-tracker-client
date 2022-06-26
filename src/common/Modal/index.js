import { Modal } from 'antd'
import { useState } from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Input, Space } from 'antd'
import { Button } from '../Button'

export const ModalUser = () => {
  //Modal
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState('Content of the modal')

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds')
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setVisible(false)
  }
  //FinModal

  //Input Password
  //Fin
  return (
    <>
      <div className="w-1/12">
        <Button type="secondary" text="Crear Usuario" onClick={showModal} />
      </div>
      <Modal
        // title="Usuarios"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {/* <p>{modalText}</p> */}

        <h2 className="text-blue-500 text-3xl font-semibold">Usuarios</h2>
        <div>
          <p className="text-blue-500 font-semibold">Crear usuario</p>
          <div className="flex justify-between mb-5">
            <div className="mr-3 w-1/2">
              <label>Usuario</label>
              <Input placeholder="Escribe el usuario aquí" />
            </div>
            <div className="w-1/2">
              <label>Correo electrónico</label>
              <Input placeholder="Escribe el correo aquí" />
            </div>
          </div>
          <div>
            <Space direction="vertical">
              <div className="flex justify-between">
                <div className="mr-3 w-1/2">
                  <label>Contraseña</label>
                  <Input.Password placeholder="input password" />
                </div>
                <div className="w-1/2">
                  <label>Repetir Contraseña</label>
                  <Input.Password
                    placeholder="input password"
                    iconRender={visible =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </div>
              </div>
            </Space>
          </div>
        </div>
      </Modal>
    </>
  )
}
