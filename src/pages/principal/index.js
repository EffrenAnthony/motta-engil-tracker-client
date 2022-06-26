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

  return (
    <div className="w-full h-screen">
      <div className="h-1/4">
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
          <div className="w-3/12 flex space-x-4 px-5 mt-5">
            <Button type="primary" text="Buscar" />
            <Button type="warning" text="Reporte" />
          </div>
        </div>
      </div>
      {/* Map */}
      <div className="bg-blue-500 w-full h-3/4">
        <MapView />
      </div>
    </div>
  )
}
