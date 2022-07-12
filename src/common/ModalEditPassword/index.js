import { Modal, message } from 'antd'
import { useState } from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Input, Space, Form } from 'antd'
import { Button } from '../Button'
import { useUsers } from '../../context/usersContext'
import ICONPASS from '../../assets/images/password.svg'

export const ModalEditPassword = () => {
  //Modal
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [user, setUser] = useState({
    name: '',
    pass: '',
    confirmPass: '',
    email: '',
  })
  const [form] = Form.useForm()
  const { createUser } = useUsers()
  const showModal = () => {
    setVisible(true)
  }

  // const handleOk = () => {
  //   setModalText('The modal will be closed after two seconds')
  //   setConfirmLoading(true)
  //   setTimeout(() => {
  //     setVisible(false)
  //     setConfirmLoading(false)
  //   }, 2000)
  // }

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
          color: 'FF000000',
        })

        setVisible(false)
        setConfirmLoading(false)
        setUser({
          name: '',
          pass: '',
          confirmPass: '',
          email: '',
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
      {/* <Button type="secondary" text="Crear Usuario" onClick={showModal} /> */}
      <Button
        text={<img className="w-5/12 m-auto h-5" src={ICONPASS} />}
        type="primary"
        onClick={showModal}
      />

      <Modal
        // title="Usuarios"
        visible={visible}
        onOk={form.submit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {/* <p>{modalText}</p> */}

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
        </Form>
      </Modal>
    </>
  )
}
