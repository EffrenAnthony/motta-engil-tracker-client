import { Modal, message } from 'antd'
import { useState } from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Input, Space, Form } from 'antd'
import { Button } from '../Button'
import { useUsers } from '../../context/usersContext'
import ICONPASS from '../../assets/images/password.svg'

export const ModalEditPassword = ({ userId }) => {
  //Modal
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [user, setUser] = useState({
    pass: '',
  })
  const [form] = Form.useForm()
  const { updatePasswordUser } = useUsers()
  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }
  //FinModal

  const submit = async () => {
    setConfirmLoading(true)

    if (user.pass == user.confirmPass) {
      await updatePasswordUser({
        pass: user.pass,
        id: userId,
      })

      setVisible(false)
      setConfirmLoading(false)
      setUser({
        confirmPass: '',
      })
    } else {
      message.warning('Las contraseñas no coinciden')
      setConfirmLoading(false)
    }
  }
  //Fin
  return (
    <>
      {/* <Button type="secondary" text="Crear Usuario" onClick={showModal} /> */}
      <Button
        text={<img className="w-5/12 m-auto h-5" src={ICONPASS} />}
        type="primary"
        onClick={showModal}
      />

      <Modal
        visible={visible}
        confirmLoading={confirmLoading}
        footer={null}
        closable={true}
        onCancel={handleCancel}
      >
        <h2 className="text-blue-500 text-3xl font-semibold">Usuarios</h2>
        <Form form={form} onFinish={submit}>
          <p className="text-blue-500 font-semibold">Reestablecer contraseña</p>
          <div className="flex justify-between mb-5">
            <div className="mr-3 w-1/2">
              <Button type="primary" text="Enviar correo" />
            </div>
          </div>
          <div>
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
          <div className="flex flow-row gap-2 mt-6">
            <Button text="Guardar" type="primary" htmlType="submit" />
            <Button text="Cancelar" type="warning" onClick={handleCancel} />
          </div>
        </Form>
      </Modal>
    </>
  )
}
