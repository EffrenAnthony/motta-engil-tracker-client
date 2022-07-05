import { DownOutlined } from '@ant-design/icons'
import { Select, Dropdown, Menu, Space } from 'antd'
import { Button } from '../../common/Button'
import { useEffect } from 'react'
import { useState } from 'react'
import MapView from '../../components/Map/MapView'
import DatePicker from 'react-datepicker'
import 'leaflet/dist/leaflet.css'
import 'react-datepicker/dist/react-datepicker.css'

const { Option } = Select

export const Principal = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const options = [
    {
      label: 'V5F-655',
      key: '0',
    },
    {
      label: 'V5F-665',
      key: '1',
    },
  ]
  const menu = (
    <Menu
      items={[
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
    <div className="w-full h-screen flex flex-col">
      <div className="py-4">
        <h1 className="text-blue-500 text-3xl font-semibold px-5 py-2">
          Principal
        </h1>
        <div className="px-5">
          <div className="w-72 mb-2">
            <span className="mr-4 text-sl font-semibold">Vehículo</span>
            <Select
              showSearch
              placeholder="Seleccione un vehículo"
              onSearch={e => console.log('eee', e)}
              // filterOption={(input, option) =>
              //   option.children.toLowerCase().includes(input.toLowerCase())
              // }
              className="border border-blue-500 rounded px-2 py-1"
            >
              {options.map(option => (
                <Option key={option.key} value={option.label}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
          <div className="flex space-x-4">
            <div>
              <p className="mr-4 mb-1 text-sl font-semibold text-block">
                Fecha inicio
              </p>
              <span className="border block border-blue-500 rounded px-2 py-1 w-full">
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                />
              </span>
            </div>
            <div className="">
              <p className="mr-4 mb-1 text-sl font-semibold text-block">
                Fecha fin
              </p>
              <span className="border block border-blue-500 rounded px-2 py-1 w-full">
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                />
              </span>
            </div>
            <div className="">
              <p className="mr-4 mb-1 text-sl font-semibold text-block">
                Hora inicio
              </p>
              <Select
                // showSearch
                defaultValue="07:00"
                // filterOption={(input, option) =>
                //   option.children.toLowerCase().includes(input.toLowerCase())
                // }
                className="border border-blue-500 rounded px-2 py-1"
              >
                {['07:00', '07:30', '08:00', '08:30', '09:00', '09:30'].map(
                  hour => (
                    <Option key={hour} value={hour}>
                      {hour}
                    </Option>
                  )
                )}
              </Select>
            </div>
            <div className="">
              <p className="mr-4 mb-1 text-sl font-semibold text-block">
                Hora fin
              </p>
              <Select
                // showSearch
                onSearch={e => console.log('eee', e)}
                defaultValue="07:00"
                // filterOption={(input, option) =>
                //   option.children.toLowerCase().includes(input.toLowerCase())
                // }
                className="border border-blue-500 rounded px-2 py-1"
              >
                {['07:00', '07:30', '08:00', '08:30', '09:00', '09:30'].map(
                  hour => (
                    <Option key={hour} value={hour}>
                      {hour}
                    </Option>
                  )
                )}
              </Select>
            </div>
          </div>
          <div className="w-3/12 flex space-x-4 mt-5">
            <Button type="primary" text="Buscar" />
            <Button type="warning" text="Reporte" />
          </div>
        </div>
      </div>
      {/* Map */}
      <div className="bg-blue-500 w-full grow">
        <MapView />
      </div>
    </div>
  )
}
