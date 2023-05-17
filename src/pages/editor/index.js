import { Select, Menu, Modal, message } from 'antd'
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  CircleMarker,
  Tooltip,
} from 'react-leaflet'
import { CSVLink } from 'react-csv'
import { Input } from '../../common/Input'
import { Table } from 'antd'
import { Button } from '../../common/Button'
import React, { useRef, useState, useCallback } from 'react'
import { useMap } from 'react-leaflet/hooks'
import { HexColorPicker } from 'react-colorful'
import useClickOutside from './../../hooks/useClickOutside'
import { usePointsLines } from '../../context/pointsLinesContext'
import ICONSUBIR from '../../assets/images/polygon.svg'

const { confirm } = Modal
const { Option } = Select
const INITIAL_PICKER_COLOR = '#006EB9'

const MarkerList = ({ markers }) => {
  return (
    <>
      {markers.length > 0 &&
        markers.map(marker =>
          marker.icon ? (
            <Marker
              key={marker.id}
              position={[marker.attributes.latitude, marker.attributes.longitude]}
              icon={marker.icon}
            >
              <Tooltip sticky>{marker.attributes.name}</Tooltip>
            </Marker>
          ) : (
            <CircleMarker
              key={marker.id}
              center={[marker.attributes.latitude, marker.attributes.longitude]}
              pathOptions={{ color: marker.attributes.color, weight: 12 }}
              radius={6}
            >
              <Tooltip sticky>{marker.attributes.name}</Tooltip>
            </CircleMarker>
          )
        )}
    </>
  )
}

const ChangeCenter = ({ center, zoom }) => {
  const map = useMap()
  map.setView(center, zoom)
  return null
}

const LinesList = ({ lines }) => {
  return (
    <>
      {lines.length > 0 &&
        lines.map(line => (
          <Polyline
            key={line.id}
            positions={[
              [line.attributes.start.latitude, line.attributes.start.longitude],
              [line.attributes.end.latitude, line.attributes.end.longitude],
            ]}
            pathOptions={{ color: line.attributes.color }}
          >
            <Tooltip sticky>{line.attributes.name}</Tooltip>
          </Polyline>
        ))}
    </>
  )
}

export const Editor = () => {
  const {
    points,
    createPoint,
    editPoint,
    deletePoint,
    lines,
    createLine,
    editLine,
    deleteLine,
  } = usePointsLines()


  const [point, setPoint] = useState({
    name: '',
    latitude: '',
    longitude: '',
    color: '#FF0000',
    icon: '',
  })

  const [line, setLine] = useState({
    name: '',
    start:{
      latitude:'',
      longitude: ''
    },
    end:{
      latitude:'',
      longitude: ''
    },
    color: '#FF0000',
  })

  const [option, setOption] = useState(0)
  const [isOpen, toggle] = useState(false)
  const [color, setColor] = useState(INITIAL_PICKER_COLOR)
  const popover = useRef()
  const close = useCallback(() => toggle(false), [])
  const deleteRecord = (option, key) => {
    if (option == 0) deletePoint(key)
    else deleteLine(key)
    Modal.destroyAll()
  }
  useClickOutside(popover, close)
  const showConfirmDelete = key => {
    confirm({
      closable: true,
      icon: null,
      content: (
        <div>
          <p className="text-center font-semibold m-4">
            {'Seguro que desea eliminar el registro?'}
          </p>
          <div className="flex flow-row gap-2">
            <Button
              text="Si"
              type="primary"
              onClick={() => deleteRecord(option, key)}
            />
            <Button text="No" type="warning" onClick={Modal.destroyAll} />
          </div>
        </div>
      ),
      footer: null,
      okButtonProps: { style: { display: 'none' } },
      cancelButtonProps: { style: { display: 'none' } },
    })
  }
  //Tabla
  const columns = [
    {
      title: 'Punto',
      dataIndex: 'name',
      width: '15%',
    },
    {
      title: 'Latitud',
      dataIndex: 'latitude',
      width: '30%',
    },
    {
      title: 'Longitud',
      dataIndex: 'longitude',
      width: '30%',
    },
    {
      title: 'Acción',
      dataIndex: 'operation',
      width: '25%',
      render: (_, elem) => (
        <div className="flex gap-0">
          <Button text="Editar" onClick={() => edit(elem)} />
          <Button text="Eliminar" onClick={() => showConfirmDelete(elem.key)} />
        </div>
      ),
    },
  ]
  const columnsLines = [
    {
      title: 'Linea',
      dataIndex: 'name',
      width: '20%',
    },
    {
      title: 'Latitud 1',
      dataIndex: 'latitude',
      width: '15%',
    },
    {
      title: 'Longitud 1',
      dataIndex: 'longitude',
      width: '15%',
    },
    {
      title: 'Latitud 2',
      dataIndex: 'latitude',
      width: '15%',
    },
    {
      title: 'Longitud 2',
      dataIndex: 'longitude',
      width: '15%',
    },
    {
      title: 'Acción',
      dataIndex: 'operation',
      width: '20%',
      render: (_, elem) => (
        <div className="flex gap-0">
          <Button text="Editar" onClick={() => edit(elem)} />
          <Button text="Eliminar" onClick={() => showConfirmDelete(elem.key)} />
        </div>
      ),
    },
  ]

  const edit = data => {
    if (option === 0)
      setPoint({
        id: data.key,
        name: data.attribute.name,
        latitude: data.attribute.latitude,
        longitude: data.attribute.longitude,
        icon: data.attribute.icon,
      })
    else
      setLine({
        id: data.key,
        name: data.attribute.name,
        start: data.attribute.start,
        end: data.attribute.end,
      })
    setColor(data.color)
  }

  const savePoint = async () => {
    if (point.id === undefined) {
      if (point.name != '' && point.latitude != '' && point.longitude != '') {
        await createPoint({
          name: point.name,
          latitude: point.latitude,
          longitude: point.longitude,
          color: color,
          // icon: point.icon,
          type: 'point'
        })
        setPoint({
          name: '',
          latitude: '',
          longitude: '',
          icon: '',
        })
        setColor(INITIAL_PICKER_COLOR)
      } else message.warning('Completar los campos')
    } else {
      if (point.name != '' && point.latitude != '' && point.longitude != '') {
        await editPoint({
          name: point.name,
          latitude: point.latitude,
          longitude: point.longitude,
          color: color,
          // icon: point.icon,
          id: point.id,
        })
        setPoint({
          name: '',
          latitude: '',
          longitude: '',
          icon: '',
          id: undefined,
        })
        setColor(INITIAL_PICKER_COLOR)
      } else message.warning('Completar los campos')
    }
  }

  const saveLine = async () => {
    if (line.id === undefined) {
      if (
        line.name != '' &&
        line.latitude != '' &&
        line.start.longitude != '' &&
        line.end.latitude != '' &&
        line.end.longitude != ''
      ) {
        await createLine({
          name: line.name,
          start: {...line.start},
          end: {...line.end},
          color: color,
          width: 2,
          type:'line'
        })
        setLine({
          name: '',
          start:{latitude: '',longitude:''},
          end:{latitude:'',longitude:''}
        })
        setColor(INITIAL_PICKER_COLOR)
      } else message.warning('Completar los campos')
    } else {
      if (
        line.name != '' &&
        lline.start.latitude != '' &&
        line.start.longitude != '' &&
        line.end.latitude != '' &&
        line.end.longitude != ''
      ) {
        await editLine({
          name: line.name,
          start: {...line.start},
          end: {...line.end},
          color: color,
          id: line.id,
        })
        setLine({
          name: '',
          start:{latitude: '',longitude:''},
          end:{latitude:'',longitude:''},
          id: undefined,
        })
        setColor(INITIAL_PICKER_COLOR)
      } else message.warning('Completar los campos')
    }
  }

  let x = -12.1045
  let y = -77.036779
  if (option == 0 && points[points.length - 1])
    x = points[points.length - 1].attributes.latitude

  if (option == 1 && lines[lines.length - 1])
    x = lines[lines.length - 1].attributes?.start?.latitude

  if (option == 0 && points[points.length - 1])
    y = points[points.length - 1].attributes.longitude

  if (option == 1 && lines[lines.length - 1])
    y = lines[lines.length - 1].attributes?.end?.longitude

  const zoom = 15

  //modal

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex justify-start items-center content-center">
        <h1 className="text-blue-500 text-3xl font-semibold px-5 py-5">
          Puntos en el mapa
        </h1>
        <div className="w-5/12">
          <span className="mr-4 text-sl font-semibold">Tipo</span>
          <div className="border inline-block border-blue-500 rounded">
            <Select defaultValue="0" onChange={key => setOption(key)}>
              <Option value="0">Punto</Option>
              <Option value="1">Linea</Option>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex pb-5">
        <div className="w-6/12">
          <div className="flex justify-around">
            <div className="w-5/12">
              <label>Nombre</label>
              <Input
                value={option == 0 ? point.name : line.name}
                onChange={event => {
                  option == 0
                    ? setPoint({ ...point, name: event.target.value })
                    : setLine({ ...line, name: event.target.value })
                }}
                placeholder="Escribe nombre"
              />
            </div>
            <div className="w-5/12">
              <label>Ícono</label>
              <div className="flex justify-between gap-2 mb-1">
                <div className="relative w-10/12">
                  <Input
                    value={color}
                    onChange={e => {
                      setColor(e.target.value)
                    }}
                  />
                  <div className="flex justify-between absolute top-px right-1">
                    <div className="picker">
                      <div
                        className="swatch"
                        style={{ backgroundColor: color }}
                        onClick={() => toggle(true)}
                      />

                      {isOpen && (
                        <div className="popover z-1000" ref={popover}>
                          <HexColorPicker
                            color={color}
                            onChange={color => {
                              setColor(color)
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-2/12">
                  <Button
                    type="primary"
                    text={
                      <img
                        className="w-5/12 m-auto h-5 py-1 mb-1"
                        src={ICONSUBIR}
                      />
                    }
                    onClick={showModal}
                  />
                  <Modal
                    title=""
                    visible={isModalVisible}
                    // onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                  >
                    <div className="border-dashed border-2 relative mt-10 py-5 px-5 h-20 ">
                      <input className="btnFile" type="file" />
                      <div className="text-center flex justify-center">
                        <p className="mr-3">Seleccionar icono</p>
                        <img
                          className="rounded-full h-7 border-blue-500 rounded w-7 bg-blue-500 py-2 px-2"
                          src={ICONSUBIR}
                        />
                      </div>
                    </div>
                    <div className="m-auto w-3/12 mt-3">
                      <Button type="primary" text={'Cargar'}></Button>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-around">
            <div className="w-5/12">
              <label>Latitud</label>
              <Input
                type="text"
                value={option == 0 ? point.latitude : line.start.latitude}
                onChange={event => {
                  option == 0
                    ? setPoint({ ...point, latitude: event.target.value })
                    : setLine({ ...line, start:{...line.start,latitude: event.target.value} })
                }}
                placeholder="Escribe latitud"
              />
            </div>
            <div className="w-5/12">
              <label>Longitud</label>
              <Input
                value={option == 0 ? point.longitude : line.start.longitude}
                onChange={event => {
                  option == 0
                    ? setPoint({ ...point, longitude: event.target.value })
                    : setLine({ ...line, start:{...line.start,longitude: event.target.value} })
                }}
                placeholder="Escribe longitud"
              />
            </div>
          </div>
          {option == 1 && (
            <div className="flex justify-around">
              <div className="w-5/12">
                <label>Latitud</label>
                <Input
                  type="text"
                  value={line.end.latitude}
                  onChange={event => {
                    setLine({ ...line, end:{...line.end,latitude: event.target.value}})
                  }}
                  placeholder="Escribe latitud"
                />
              </div>
              <div className="w-5/12">
                <label>Longitud</label>
                <Input
                  value={line.end.longitude}
                  onChange={event => {
                    setLine({ ...line, end:{...line.end,longitude: event.target.value}})
                  }}
                  placeholder="Escribe longitud"
                />
              </div>
            </div>
          )}
          <div className="flex justify-between px-5 pt-3">
            <div className="w-4/12 mr-5">
              <Button
                text="Agregar"
                onClick={option == 0 ? savePoint : saveLine}
                type="primary"
                style={{
                  marginBottom: 16,
                }}
              ></Button>
            </div>
            <div className="w-4/12 mr-5">
              <Button type="secondary" text="Cargar Excel" />
            </div>
            <div className="w-4/12 ">
              <CSVLink
                separator={';'}
                headers={
                  option == 0
                    ? ['NOMBRE', 'LATITUD', 'LONGITUD']
                    : [
                        'NOMBRE',
                        'LATITUD 1',
                        'LONGITUD 1',
                        'LATITUD 2',
                        'LONGITUD 2',
                      ]
                }
                filename={option == 0 ? 'puntos.csv' : 'lineas.csv'}
                className="block text-center bg-yellow-600 text-black hover:text-black w-full px-2 py-1 rounded  relative "
                data={
                  option == 0
                    ? points.map(elem => {
                        return [elem.attributes.name, elem.attributes.latitude, elem.attributes.longitude]
                      })
                    : lines.map(elem => {
                        return [
                          elem.attributes.name,
                          elem.attributes.start.latitude,
                          elem.attributes.start.longitude,
                          elem.attributes.end.latitude,
                          elem.attributes.end.longitude,
                        ]
                      })
                }
              >
                Descargar Excel
              </CSVLink>
            </div>
          </div>
        </div>
        <div className="w-6/12 shadow-lg shadow-blue-500/50  rounded mr-5">
          <Table
            size="small"
            scroll={{
              y: 170,
              x: true,
            }}
            rowClassName={(_, index) =>
              index % 2 === 0 ? 'py-2' : 'bg-gray-100 py-2'
            }
            bordered
            dataSource={
              option == 0
                ? points.map(elem => {
                    return {
                      name: elem.attributes.name,
                      key: elem.id,
                      latitude: elem.attributes.latitude,
                      longitude: elem.attributes.longitude,
                      color: elem.attributes.color,
                    }
                  })
                : lines.map(elem => {
                    return {
                      name: elem.attributes.name,
                      key: elem.id,
                      latitude: elem.attributes.start.latitude,
                      longitude: elem.attributes.start.longitude,
                      latitude2: elem.attributes.end.latitude,
                      longitude2: elem.attributes.end.longitude,
                      color: elem.attributes.color,
                    }
                  })
            }
            columns={option == 0 ? columns : columnsLines}
            pagination={false}
          />
        </div>
      </div>
      <div className="flex grow relative border-t border-gray-200 w-full">
        <div className="bg-blue-500 w-full">
          <MapContainer center={[x, y]}>
            <ChangeCenter center={[x, y]} zoom={zoom} option={option} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {option == 0 && <MarkerList markers={points} />}
            {option == 1 && <LinesList lines={lines} />}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}
