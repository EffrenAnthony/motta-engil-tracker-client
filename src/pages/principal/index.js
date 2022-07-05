import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Menu, Space } from 'antd'
import { Button } from '../../common/Button'
import { useEffect } from 'react'
import { useState } from 'react'
import MapView from '../../components/Map/MapView'
import 'leaflet/dist/leaflet.css'

export const Principal = () => {
  const menu = (
    <Menu
      items={[
        {
          label: <a href="#">V5F-655</a>,
          key: '0',
        },
        {
          label: <a href="#">V5F-665</a>,
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: '3rd menu item',
          key: '3',
        },
      ]}
    />
  )
  // Map
  // tabla
  let records = []
  for (let i = 0; i < 48; i++) {
    records.push({
      hora: '7:0' + i,
      accion: 'Inicio de carguío ' + i,
    })
  }
  // tabla fin
  return (
    <div className="w-full h-screen">
      <div className="w-full h-2/6">
        <h1 className="text-blue-500 text-3xl font-semibold px-5 py-5">
          Principal
        </h1>
        <div className="px-5">
          <div className="w-72 mb-5">
            <span className="mr-4 text-sl font-semibold">Vehículo</span>
            <span className="border border-blue-500 rounded px-2 py-1">
              <Dropdown overlay={menu} trigger={['click']}>
                <Space>
                  Selecciona una opción
                  <DownOutlined />
                </Space>
              </Dropdown>
            </span>
          </div>
          <div className="flex space-x-4">
            <div className="">
              <p className="mr-4 text-sl font-semibold text-block">
                Fecha inicio
              </p>
              <span className="border block border-blue-500 rounded px-2 py-1 w-full">
                <Dropdown overlay={menu} trigger={['click']}>
                  <Space>
                    Selecciona una opción
                    <DownOutlined />
                  </Space>
                </Dropdown>
              </span>
            </div>
            <div className="">
              <p className="mr-4 text-sl font-semibold text-block">Fecha fin</p>
              <span className="border block border-blue-500 rounded px-2 py-1 w-full">
                <Dropdown overlay={menu} trigger={['click']}>
                  <Space>
                    Selecciona una opción
                    <DownOutlined />
                  </Space>
                </Dropdown>
              </span>
            </div>
            <div className="">
              <p className="mr-4 text-sl font-semibold text-block">
                Hora inicio
              </p>
              <span className="border block border-blue-500 rounded px-2 py-1 w-full">
                <Dropdown overlay={menu} trigger={['click']}>
                  <Space>
                    Selecciona una opción
                    <DownOutlined />
                  </Space>
                </Dropdown>
              </span>
            </div>
            <div className="">
              <p className="mr-4 text-sl font-semibold text-block">Hora fin</p>
              <span className="border block border-blue-500 rounded px-2 py-1 w-full">
                <Dropdown overlay={menu} trigger={['click']}>
                  <Space>
                    Selecciona una opción
                    <DownOutlined />
                  </Space>
                </Dropdown>
              </span>
            </div>
          </div>
          <div className="w-3/12 flex space-x-4 mt-5 mb-5">
            <Button type="primary" text="Buscar" />
            <Button type="warning" text="Reporte" />
          </div>
        </div>
      </div>
      <div className="flex justify-between h-4/6">
        <div className="w-3/12 overflow-y-scroll relative pb-8 pt-8">
          <table className="table-auto w-full md:table-fixed  text-center border border-collapse border border-slate-500">
            <thead className="border-solid border-solid">
              <tr className="font-bold text-lg border-solid">
                <th className="border border-slate-600">Hora</th>
                <th className="border border-slate-600">Acción</th>
              </tr>
            </thead>
            <tbody className="">
              {records.map(record => {
                return (
                  <tr className="border-solid" key={record.hora}>
                    <td className="border border-slate-700">{record.hora}</td>
                    <td className="border border-slate-700">{record.accion}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {/* <div className="absolute bottom-0 right-0 left-0 bg-red-500">
            <p>zxasdasdasdsa</p>
          </div> */}
        </div>
        {/* Map absolute bottom-0 left-0*/}

        <div className="w-9/12 h-6/6">
          <MapView />
        </div>
      </div>
    </div>
  )
}
