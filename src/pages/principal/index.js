import { DownOutlined } from '@ant-design/icons'
import { Select, Dropdown, Menu, Space } from 'antd'
import { Button } from '../../common/Button'
import { useEffect } from 'react'
import { useState } from 'react'
import MapView from '../../components/Map/MapView'
import DatePicker from 'react-datepicker'
import 'leaflet/dist/leaflet.css'
import 'react-datepicker/dist/react-datepicker.css'
import { useLocations } from '../../context/locationsContext'
import ICONPLAY from '../../assets/images/play.png'
import ICONARROWLEFT from '../../assets/images/arrow-left.png'
import ICONARROWRIGHT from '../../assets/images/arrow-right.png'
import ICONARROWTOP from '../../assets/images/arrow-top.png'
import ICONARROWBOTTOM from '../../assets/images/arrow-bottom.png'
import { useUsers } from '../../context/usersContext'

const { Option } = Select
const MILISECONDS_HOUR = 3600000

const now = new Date()
const getTime = (time, resetHour) => {
  if (resetHour)
    return `${
      time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
    }:00`
  return `${time.getHours() < 10 ? '0' + time.getHours() : time.getHours()}:${
    time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
  }`
}

export const Principal = () => {
  const [showFilters, setShowfilters] = useState(true)
  const { users, getUsers } = useUsers()
  const [filters, setFilters] = useState({
    userId: '',
    startDate: now,
    endDate: now,
    startHour: getTime(now, true),
    endHour: getTime(new Date(now.getTime() + MILISECONDS_HOUR), true),
  })
  const { history, vehicleSelected, getVehicles } = useLocations()

  const hours = [
    '00:00',
    '00:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
    '04:30',
    '05:00',
    '05:30',
    '06:00',
    '06:30',
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
    '24:00',
  ]
  const options = users.map(user => {
    return {
      label: user.name,
      key: user._id,
    }
  })
  const showFilter = () => {
    setShowfilters(!showFilters)
  }
  // Map
  // tabla
  useEffect(() => {
    getUsers()
    getVehicles(filters)
  }, [])

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="py-4">
        <h1 className="text-blue-500 text-3xl font-semibold px-5 py-2">
          Principal
        </h1>
        {showFilters && (
          <div className="px-5">
            <div className="w-72 mb-2">
              <span className="mr-4 text-sm font-semibold">Usuario</span>
              <Select
                showSearch
                placeholder="Seleccione un vehículo"
                onSelect={(e, user) =>
                  setFilters({ ...filters, userId: user.key })
                }
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
                    selected={filters.startDate}
                    onChange={date =>
                      setFilters({ ...filters, startDate: date })
                    }
                  />
                </span>
              </div>
              <div className="">
                <p className="mr-4 mb-1 text-sl font-semibold text-block">
                  Fecha fin
                </p>
                <span className="border block border-blue-500 rounded px-2 py-1 w-full">
                  <DatePicker
                    selected={filters.endDate}
                    onChange={date => setFilters({ ...filters, endDate: date })}
                  />
                </span>
              </div>
              <div className="">
                <p className="mr-4 mb-1 text-sl font-semibold text-block">
                  Hora inicio
                </p>
                <Select
                  defaultValue={filters.startHour}
                  className="border border-blue-500 rounded px-2 py-1"
                >
                  {hours.map(hour => (
                    <Option key={hour} value={hour}>
                      {hour}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="">
                <p className="mr-4 mb-1 text-sl font-semibold text-block">
                  Hora fin
                </p>
                <Select
                  onSearch={e => console.log('eee', e)}
                  defaultValue={filters.endHour}
                  className="border border-blue-500 rounded px-2 py-1"
                >
                  {hours.map(hour => (
                    <Option key={hour} value={hour}>
                      {hour}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="w-3/12 flex space-x-4 mt-5">
              <Button
                type="primary"
                text="Buscar"
                onClick={() => getVehicles(filters)}
              />
              <Button type="warning" text="Reporte" />
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between grow overflow-hidden relative border-t border-gray-200">
        {vehicleSelected && (
          <div className="w-3/12 h-full relative pb-8 flex flex-col">
            <div className="grow overflow-y-auto mb-6 max-h-full">
              <table className="table-auto w-full md:table-fixed text-center border-collapse  ">
                <thead className="sticky top-0 bg-white border-b">
                  <tr className="font-bold text-lg divide-x">
                    <th className="">Hora</th>
                    <th className="">Acción</th>
                  </tr>
                </thead>
                <tbody className=" divide-y border-b">
                  {history.map(record => {
                    const time = new Date(record.createdAt)
                    return (
                      <tr className="divide-x" key={record._id}>
                        <td className="">{getTime(time)}</td>
                        <td className="center">
                          {record.data ? record.data.topic : ''}
                          {record?.data?.material && (
                            <div className="border-t">
                              {record.data.material}
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="absolute w-full bottom-0 left-0 h-14 flex justify-between items-center px-2 py-2">
              <div className="bg-blue-500 px-2 py-2 rounded-full  h-9 w-9 flex justify-center items-center cursor-pointer">
                <img className="w-2" src={ICONARROWLEFT} />
              </div>
              <div className="bg-blue-500 px-2 py-2 rounded-full  h-9 w-9 flex justify-center items-center cursor-pointer">
                <img className="w-2" src={ICONPLAY} />
              </div>
              <div className="bg-blue-500 px-2 py-2 rounded-full  h-9 w-9 flex justify-center items-center cursor-pointer">
                <img className="w-2" src={ICONARROWRIGHT} />
              </div>
            </div>
          </div>
        )}
        {/* Map */}
        <div className="bg-blue-500 w-full relative">
          <MapView />
          {vehicleSelected && (
            <div
              onClick={showFilter}
              className="bg-blue-500 px-2 py-2 rounded-full  h-9 w-9 flex justify-center items-center cursor-pointer absolute left-2/4 z-1000 top-2"
            >
              <img
                className="w-2"
                src={showFilters ? ICONARROWTOP : ICONARROWBOTTOM}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
