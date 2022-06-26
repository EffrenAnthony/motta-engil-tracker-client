import Principal from '../assets/images/principal-icon.svg'
import Editor from '../assets/images/point-editor-icon.svg'
import Usuarios from '../assets/images/usuarios-icon.svg'
import Configuracion from '../assets/images/configuracion-icon.svg'
import Cerrar from '../assets/images/cerrar-sesion-icon.svg'
import { Modal } from 'antd'
import { useState } from 'react'
import { Button } from '../common/Button'
import { useCurrentUser } from '../context/loginContext'

export const Layout = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const { logout } = useCurrentUser()

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
    logout()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <div className="w-full max-h-full md:max-h-screen">
      <div className="flex h-screen">
        <div className="w-3/12 max-h-screen max-h-full max-h-screen relative bg-sky-900 stiked">
          <div className="px-3 py-5 flex border-b-yellow-600 cursor-pointer border-b border-l-yellow-600 border-l-4">
            <img className="mr-2" src={Principal} alt="" />
            <span className="text-white">Principal</span>
          </div>
          <div className="px-3 py-5 flex border-b-yellow-600 cursor-pointer border-b">
            <img className="mr-2" src={Editor} alt="" />
            <span className="text-white">Editor de puntos y lineas</span>
          </div>
          <div className="px-3 py-5 flex border-b-yellow-600 cursor-pointer border-b">
            <img className="mr-2" src={Usuarios} alt="" />
            <span className="text-white">Usuarios</span>
          </div>
          <div className="px-3 py-5 flex border-b-yellow-600 cursor-pointer border-b mb-16">
            <img className="mr-2" src={Configuracion} alt="" />
            <span className="text-white">Configuaraciones</span>
          </div>
          <div className="absolute bottom-0 right-0 left-0  bg-yellow-600 px-3 py-5 flex border-b-neutral-100 cursor-pointer">
            <Button
              type="warning"
              icon={
                <img
                  className="text-white-300 mr-2 inline absolute left-0"
                  src={Cerrar}
                  alt=""
                />
              }
              text="Cerrar sesión"
              onClick={showModal}
            ></Button>
            <Modal
              title="¿Esta seguro que desea cerrar sesión?"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            ></Modal>
          </div>
        </div>
        <div className="w-9/12 max-h-screen max-h-full max-h-screen">
          {children}
        </div>
      </div>
    </div>
  )
}
