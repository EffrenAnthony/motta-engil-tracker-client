import { useState } from 'react'
import IMG1 from '../../assets/images/muestra1.png'
import IMG2 from '../../assets/images/muestra2.png'
import IMG3 from '../../assets/images/muestra3.png'
import IMG4 from '../../assets/images/muestra4.png'
import IMG5 from '../../assets/images/muestra5.png'
import IMG6 from '../../assets/images/muestra6.png'
import LOGO from '../../assets/images/logoLogin.png'
import ICONFORM from '../../assets/images/icon-form.svg'
import { Button } from '../../common/Button'
import { Input } from '../../common/Input'
import { useCurrentUser } from '../../context/authContext'

export const Login = () => {
  const [state, setState] = useState({
    user: '',
    pass: '',
  })
  const { login } = useCurrentUser()

  const submit = e => {
    e.preventDefault()
    login(state)
  }

  return (
    <div className="w-full max-h-full md:max-h-screen">
      <div className="flex max-h-full md:max-h-screen max-w-screen-2xl m-auto">
        <div className="w-1/2 min-h-screen grid grid-rows-3 grid-flow-col gap-0">
          <img className="w-full h-full" src={IMG1} alt="" />
          <img className="w-full h-full" src={IMG3} alt="" />
          <img className="w-full h-full" src={IMG5} alt="" />
          <img className="w-full h-full" src={IMG2} alt="" />
          <img className="w-full h-full" src={IMG4} alt="" />
          <img className="w-full h-full" src={IMG6} alt="" />
        </div>
        <div className="w-1/2 min-h-screen flex justify-center items-center">
          <div className="w-3/5 h-4/6 flex  items-center flex-col rounded  shadow-lg shadow-blue-500/50 py-3 px-3 ">
            <img className="w-3/5 mb-5" src={LOGO} alt="" />
            <form className="w-11/12 mb-5" onSubmit={submit}>
              <label className="w-full flex text-base font-medium mb-3">
                <img className="pr-2" src={ICONFORM} alt="" />
                Usuario
              </label>
              <Input
                onChange={e => setState({ ...state, user: e.target.value })}
                type="text"
                placeholder="Escribe tu usuario "
              />
              <label className="w-full flex text-base font-medium mb-3">
                <img className="pr-2" src={ICONFORM} alt="" />
                Contraseña
              </label>
              <Input
                onChange={e => setState({ ...state, pass: e.target.value })}
                type="password"
                placeholder="Escribe tu contraseña "
              />
              <Button type="warning" text="Ingresar" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
