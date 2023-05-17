import { DownOutlined } from '@ant-design/icons'
import { Select, Dropdown, Menu, Space } from 'antd'
import { Button } from '../../common/Button'
import { useEffect, useRef } from 'react'
import { useState } from 'react'
import MapView from '../../components/Map/MapView'
import DatePicker from 'react-datepicker'
import { CSVLink } from 'react-csv'
import 'leaflet/dist/leaflet.css'
import 'react-datepicker/dist/react-datepicker.css'
import { useLocations } from '../../context/locationsContext'
import ICONPLAY from '../../assets/images/play.png'
import ICONSTOP from '../../assets/images/stop.svg'
import ICONARROWLEFT from '../../assets/images/arrow-left.png'
import ICONARROWRIGHT from '../../assets/images/arrow-right.png'
import ICONARROWTOP from '../../assets/images/arrow-top.png'
import ICONARROWBOTTOM from '../../assets/images/arrow-bottom.png'
import { useUsers } from '../../context/usersContext'
import { getTime, hours } from '../../helpers/utils'

const { Option } = Select

const STEP_NAMES = {
  carga: 'CARGA',
  inicioConduccion: 'INICIO CONDUCCION',
  finConduccion: 'FIN CONDUCCION',
  descarga: 'DESCARGA',
  inicioRetorno: 'INICIO RETORNO',
  finRetorno: 'FIN RETORNO',
}

export const Principal = () => {
  const refInterval = useRef()
  const [showFilters, setShowfilters] = useState(false)
  const { users, getUsers } = useUsers()
  const [isPlaying, setIsPlaying] = useState(false)
  const [filters, setFilters] = useState({
    userName: '',
    userId: '',
    startDate: '',
    endDate: '',
    startHour: '',
    endHour: '',
  })
  const [currentRecord, setCurrentRecord] = useState(-1)
  const { history, vehicleSelected, getVehicles, getHistory, vehicles } =
    useLocations()

  const options = vehicles.map(user => {
    return {
      label: user.username,
      key: user.userid,
    }
  })
  const showFilter = () => {
    setShowfilters(!showFilters)
  }

  const prevRecord = () => {
    if (currentRecord > 0)
      setCurrentRecord(currentRec => {
        if (currentRec - 1 == 0) clearInterval(interval)
        return currentRec - 1
      })
    if (currentRecord == 0) setCurrentRecord(history.length - 1)
  }

  const nextRecord = () => {
    if (currentRecord < history.length - 1) setCurrentRecord(currentRecord + 1)
    if (currentRecord == history.length - 1) setCurrentRecord(0)
  }

  const playRecords = () => {
    if (!isPlaying) {
      setIsPlaying(true)
      refInterval.current = setInterval(() => {
        prevRecord()
      }, 2000)
    } else {
      setIsPlaying(false)
      clearInterval(refInterval.current)
    }
  }
  // Map
  // tabla
  useEffect(() => {
    getUsers()
    getVehicles(filters)
  }, [])

  useEffect(() => {
    if (vehicleSelected === true) setShowfilters(true)
  }, [vehicleSelected])

  useEffect(() => {
    if (history.length > 0) setCurrentRecord(history.length - 1)
  }, [history])

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="py-4">
        <h1 className="text-blue-500 text-3xl font-semibold px-5 py-1">
          Principal
        </h1>
        {showFilters && (
          <div className="px-5 py-4">
            <div className="w-72 mb-2">
              <span className="mr-4 text-sm font-semibold">Usuario</span>
              <Select
                showSearch
                placeholder="Seleccione un vehículo"
                onSelect={(e, user) =>
                  setFilters({ ...filters, userId: user.key })
                }
                defaultValue={{ key: filters.userId, value: filters.userName }}
                className="border border-blue-500 rounded "
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
                  onSelect={event => {
                    setFilters({ ...filters, startHour: event })
                  }}
                  className="border border-blue-500 rounded"
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
                  defaultValue={filters.endHour}
                  onSelect={event => {
                    setFilters({ ...filters, endHour: event })
                  }}
                  className="border border-blue-500 rounded"
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
                onClick={() => getHistory(filters)}
              />
              <CSVLink
                separator={';'}
                headers={['FECHA', 'HORA', 'ACCION', 'MATERIAL']}
                filename={'reporte.csv'}
                className="block text-center bg-yellow-600 text-black hover:text-black w-full px-2 py-1 rounded  relative "
                data={history.map(record => [
                  new Date(record.createdAt).toLocaleDateString('en-GB'),
                  getTime(new Date(record.createdAt)),
                  record?.data?.topic || '-',
                  record?.data?.material || '-',
                ])}
              >
                Reporte
              </CSVLink>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between grow overflow-hidden relative border-t border-gray-200">
        {vehicleSelected && (
          <div className="w-4/12 h-full relative pb-8 flex flex-col">
            <div className="grow overflow-y-auto mb-6 max-h-full">
              <table className="table-auto w-full md:table-fixed text-center border-collapse  ">
                <thead className="sticky top-0 bg-white border-b">
                  <tr className="font-bold text-lg divide-x">
                    <th className="">Hora</th>
                    <th className="">Acción</th>
                  </tr>
                </thead>
                <tbody className=" divide-y border-b">
                  {history.map((record, pos) => {
                    const time = new Date(record.timestamp * 1)
                    return (
                      <tr
                        className={`divide-x ${
                          pos === currentRecord ? 'bg-green-50' : ''
                        }`}
                        key={pos}
                      >
                        <td className="">{getTime(time)}</td>
                        <td className="center">
                          {record.step && `${STEP_NAMES[record.step]}\n`}
                          {record.START && (
                            <div className="border-t">
                              {`Inicio: ${record.START}`}
                            </div>
                          )}
                          {record.END && (
                            <div className="border-t">
                              {`Termino: ${record.END}`}
                            </div>
                          )}
                          {record.MATERIAL && (
                            <div className="border-t">
                              Material: {record.MATERIAL}
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
              <div
                className="bg-blue-500 px-2 py-2 rounded-full  h-9 w-9 flex justify-center items-center cursor-pointer"
                onClick={prevRecord}
              >
                <img className="w-2" src={ICONARROWLEFT} />
              </div>
              <div
                className="bg-blue-500 px-2 py-2 rounded-full  h-9 w-9 flex justify-center items-center cursor-pointer"
                onClick={playRecords}
              >
                {!isPlaying ? (
                  <img className="w-2" src={ICONPLAY} />
                ) : (
                  <img className="w-2" src={ICONSTOP} />
                )}
              </div>
              <div
                className="bg-blue-500 px-2 py-2 rounded-full  h-9 w-9 flex justify-center items-center cursor-pointer"
                onClick={nextRecord}
              >
                <img className="w-2" src={ICONARROWRIGHT} />
              </div>
            </div>
          </div>
        )}
        {/* Map */}
        <div className="bg-blue-500 w-full relative">
          <MapView
            currentRecord={currentRecord}
            setCurrentRecord={setCurrentRecord}
            filters={filters}
            updateFilters={updatedFilters => {
              setFilters({ ...filters, ...updatedFilters })
            }}
          />
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
