import { Modal, message } from 'antd'
import { useState, useRef, useCallback } from 'react'
import { Input, Form } from 'antd'
import { Button } from '../Button'
import { useUsers } from '../../context/usersContext'
import ICONEDIT from '../../assets/images/edit.svg'
import { HexColorPicker } from 'react-colorful'
import useClickOutside from '../../hooks/useClickOutside'

export const ModalEditUser = ({ user: userName, email, color, id }) => {
  //color
  const popover = useRef()
  const [isOpen, toggle] = useState(false)

  const close = useCallback(() => toggle(false), [])
  useClickOutside(popover, close)
  //Fin color

  //Modal
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [user, setUser] = useState({
    user: userName,
    color,
    email,
  })
  const { updateUser } = useUsers()

  const [form] = Form.useForm()
  // const { createUser } = useUsers()
  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }
  //FinModal

  const submit = async () => {
    setConfirmLoading(true)

    if (user.user != '' && user.email != '') {
      await updateUser({
        user: user.user,
        email: user.email,
        color: user.color,
        id: id,
      })

      setVisible(false)
      setConfirmLoading(false)
      setUser({
        user: user.user,
        email: user.email,
        color: user.color,
      })
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
        text={<img className="w-5/12 m-auto h-5" src={ICONEDIT} />}
        type="secondary"
        onClick={showModal}
      />

      <Modal
        // title="Usuarios"
        visible={visible}
        onOk={form.submit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        closable={true}
        footer={null}
      >
        {/* <p>{modalText}</p> */}

        <h2 className="text-blue-500 text-3xl font-semibold">Usuarios</h2>
        <Form form={form} onFinish={submit}>
          <p className="text-blue-500 font-semibold">Editar usuario</p>
          <div className="flex justify-between mb-5">
            <div className="mr-3 w-1/2">
              <label>Usuario</label>
              <Input
                value={user.user}
                onChange={event => {
                  setUser({ ...user, user: event.target.value })
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
                  <div className="popover z-1000" ref={popover}>
                    <HexColorPicker
                      color={user.color}
                      onChange={color => {
                        setUser({ ...user, color })
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flow-row gap-2 mt-4">
            <Button text="Guardar" type="primary" htmlType="submit" />
            <Button text="Cancelar" type="warning" onClick={handleCancel} />
          </div>
        </Form>
      </Modal>
    </>
  )
}
