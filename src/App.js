// import ReactDOM from "react-dom/client";
import 'antd/dist/antd.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/login'
import { Principal } from './pages/principal'
import { Editor } from './pages/editor'
import { Usuarios } from './pages/usuarios'
import { Configuracion } from './pages/configuracion'
import { Layout } from './components/layout'
import { UserProvider } from './context/loginContext'

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/principal"
            element={
              <Layout>
                <Principal />
              </Layout>
            }
          ></Route>
          <Route
            path="/point-editor"
            element={
              <Layout>
                <Editor />
              </Layout>
            }
          ></Route>
          <Route
            path="/users"
            element={
              <Layout>
                <Usuarios />
              </Layout>
            }
          ></Route>
          <Route
            path="/settings"
            element={
              <Layout>
                <Configuracion />
              </Layout>
            }
          ></Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
