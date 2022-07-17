import { Modal, message } from 'antd'
import { useState, useRef, useCallback } from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Input, Space, Form } from 'antd'
import { Button } from '../Button'
import { useUsers } from '../../context/usersContext'
import { HexColorPicker } from 'react-colorful'
import useClickOutside from '../../hooks/useClickOutside'

export const ModalUser = () => {
  //color
  const popover = useRef()
  const [isOpen, toggle] = useState(false)

  const close = useCallback(() => toggle(false), [])
  useClickOutside(popover, close)

  //Modal
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [user, setUser] = useState({
    name: '',
    pass: '',
    confirmPass: '',
    email: '',
    color: '#006EB9',
  })
  const [form] = Form.useForm()
  const { createUser } = useUsers()
  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setVisible(false)
  }
  //FinModal

  const submit = async () => {
    setConfirmLoading(true)
    if (
      user.name != '' &&
      user.email != '' &&
      user.pass != '' &&
      user.confirmPass != ''
    ) {
      if (user.pass == user.confirmPass) {
        await createUser({
          role: 'admin',
          name: user.name,
          user: user.name,
          pass: user.pass,
          email: user.email,
          color: user.color,
        })
        setVisible(false)
        setConfirmLoading(false)
        setUser({
          name: '',
          pass: '',
          confirmPass: '',
          email: '',
          color: '#006EB9',
        })
      } else {
        message.warning('Las contraseñas no coinciden')
        setConfirmLoading(false)
      }
    } else {
      message.warning('Por favor completar todos los campos')
      setConfirmLoading(false)
    }
  }
  //Fin
  return (
    <>
      <div>
        <Button type="secondary" text="Crear Usuario" onClick={showModal} />
      </div>
      <Modal
        visible={visible}
        confirmLoading={confirmLoading}
        footer={null}
        closable={true}
        onCancel={handleCancel}
      >
        <h2 className="text-blue-500 text-3xl font-semibold">Usuarios</h2>
        <Form form={form} onFinish={submit}>
          <p className="text-blue-500 font-semibold">Crear usuario</p>
          <div className="flex justify-between mb-5">
            <div className="mr-3 w-1/2">
              <label>Usuario</label>
              <Input
                value={user.name}
                onChange={event => {
                  setUser({ ...user, name: event.target.value })
                }}
                placeholder="Escribe el usuario aquí"
                required
              />
            </div>
            <div className="w-1/2">
              <label>Correo electrónico</label>
              <Input
                value={user.email}
                onChange={event => {
                  setUser({ ...user, email: event.target.value })
                }}
                placeholder="Escribe el correo aquí"
                required
              />
            </div>
          </div>
          <div className="mb-5">
            <Space direction="vertical">
              <div className="flex justify-between">
                <div className="mr-3 w-1/2">
                  <label>Contraseña</label>
                  <Input.Password
                    value={user.pass}
                    onChange={event => {
                      setUser({ ...user, pass: event.target.value })
                    }}
                    placeholder="input password"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label>Repetir Contraseña</label>
                  <Input.Password
                    value={user.confirmPass}
                    onChange={event => {
                      setUser({ ...user, confirmPass: event.target.value })
                    }}
                    placeholder="input password"
                    required
                    iconRender={visible =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </div>
              </div>
            </Space>
          </div>
          <div className="flex justify-between">
            <div className="w-1/2">
              <label>Color</label>
              <div className="picker">
                <div
                  className="swatch"
                  style={{ backgroundColor: user.color }}
                  onClick={() => toggle(true)}
                />

                {isOpen && (
                  <div className="popover z-10" ref={popover}>
                    <HexColorPicker
                      color={user.color}
                      onChange={color => setUser({ ...user, color })}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flow-row gap-2 mt-4">
            <Button text="Si" type="primary" htmlType="submit" />
            <Button text="No" type="warning" onClick={handleCancel} />
          </div>
        </Form>
      </Modal>
    </>
  )
}
