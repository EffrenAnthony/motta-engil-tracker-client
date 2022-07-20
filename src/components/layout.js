import PRINCIPAL from '../assets/images/principal-icon.svg'
import PRINCIPAL_ACTIVE from '../assets/images/principal-active-icon.svg'
import EDITOR from '../assets/images/point-editor-icon.svg'
import USERS from '../assets/images/usuarios-icon.svg'
import SETTINGS from '../assets/images/configuracion-icon.svg'
import CLOSE from '../assets/images/cerrar-sesion-icon.svg'
import { Modal } from 'antd'
import { useState } from 'react'
import { Button } from '../common/Button'
import { useCurrentUser } from '../context/authContext'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const { confirm } = Modal

export const Layout = ({ children }) => {
  const { pathname } = useLocation()
  const { logout } = useCurrentUser()

  const handleOk = () => {
    Modal.destroyAll()
    logout()
  }

  const showConfirm = () => {
    confirm({
      closable: true,
      icon: null,
      content: (
        <div>
          <p className="text-center font-semibold mb-6">
            ¿Esta seguro que desea cerrar sesión?
          </p>
          <div className="flex flow-row gap-2">
            <Button text="Si" type="primary" onClick={handleOk} />
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
    <div className="w-full max-h-full md:max-h-screen">
      <div className="flex h-screen">
        <div className="w-3/12 max-h-screen relative bg-sky-900 sticked">
          <Link to="/principal">
            <div
              className={`px-3 py-5 flex border-b-yellow-600 cursor-pointer border-b ${
                pathname == '/principal' ? 'border-l-yellow-600 border-l-4' : ''
              }`}
            >
              <img
                className="mr-2"
                src={pathname == '/principal' ? PRINCIPAL_ACTIVE : PRINCIPAL}
                alt=""
              />
              <span
                className={
                  pathname == '/principal' ? 'text-yellow-600' : 'text-white'
                }
              >
                Principal
              </span>
            </div>
          </Link>
          <Link to="/point-editor">
            <div
              className={`px-3 py-5 flex border-b-yellow-600 cursor-pointer border-b ${
                pathname == '/point-editor'
                  ? 'border-l-yellow-600 border-l-4'
                  : ''
              }`}
            >
              <img className="mr-2" src={EDITOR} alt="" />
              <span
                className={
                  pathname == '/point-editor' ? 'text-yellow-600' : 'text-white'
                }
              >
                Editor de puntos y lineas
              </span>
            </div>
          </Link>
          <Link to="/users">
            <div
              className={`px-3 py-5 flex border-b-yellow-600 cursor-pointer border-b ${
                pathname == '/users' ? 'border-l-yellow-600 border-l-4' : ''
              }`}
            >
              <img className="mr-2" src={USERS} alt="" />
              <span
                className={
                  pathname == '/users' ? 'text-yellow-600' : 'text-white'
                }
              >
                Usuarios
              </span>
            </div>
          </Link>
          <Link to="/settings">
            <div
              className={`px-3 py-5 flex border-b-yellow-600 cursor-pointer border-b mb-16 ${
                pathname == '/settings' ? 'border-l-yellow-600 border-l-4' : ''
              }`}
            >
              <img className="mr-2" src={SETTINGS} alt="" />
              <span
                className={
                  pathname == '/settings' ? 'text-yellow-600' : 'text-white'
                }
              >
                Configuraciones
              </span>
            </div>
          </Link>

          <div className="absolute bottom-0 right-0 left-0  bg-yellow-600 px-3 py-5 flex border-b-neutral-100 cursor-pointer">
            <Button
              type="warning"
              icon={
                <img
                  className="text-white-300 mr-2 inline absolute left-0"
                  src={CLOSE}
                  alt=""
                />
              }
              text="Cerrar sesión"
              onClick={showConfirm}
            ></Button>
          </div>
        </div>
        <div className="w-9/12 max-h-screen">{children}</div>
      </div>
    </div>
  )
}
