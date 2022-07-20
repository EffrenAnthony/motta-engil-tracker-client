// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/login'
import { Principal } from './pages/principal'
import { Editor } from './pages/editor'
import { Usuarios } from './pages/usuarios'
import { Configuracion } from './pages/configuracion'
import { Layout } from './components/layout'
import { AuthProvider } from './context/authContext'
import { UsersProvider } from './context/usersContext'
import { LocationsProvider } from './context/locationsContext'
import { LoadProvider } from './context/loadsContext'
import { getToken } from './helpers/token'
import { PointsLinesProvider } from './context/pointsLinesContext'

function App() {
  const local = getToken()
  return (
    <BrowserRouter>
      <AuthProvider>
        <UsersProvider>
          <Routes>
            <Route
              path="/"
              element={
                local ? <Navigate to="/principal" /> : <Navigate to="/login" />
              }
            />
            <Route path="/login" element={<Login />}></Route>
            <Route
              path="/principal"
              element={
                <LocationsProvider>
                  <Layout>
                    <Principal />
                  </Layout>
                </LocationsProvider>
              }
            ></Route>
            <Route
              path="/point-editor"
              element={
                <PointsLinesProvider>
                  <Layout>
                    <Editor />
                  </Layout>
                </PointsLinesProvider>
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
                <LoadProvider>
                  <Layout>
                    <Configuracion />
                  </Layout>
                </LoadProvider>
              }
            ></Route>
          </Routes>
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
