import { Select, Menu, Modal, message } from 'antd'
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'
import { Input } from '../../common/Input'
import { Table } from 'antd'
import { Button } from '../../common/Button'
import React, { useRef, useState, useCallback } from 'react'
import { useMap } from 'react-leaflet/hooks'
import { HexColorPicker } from 'react-colorful'
import useClickOutside from './../../hooks/useClickOutside'
import { usePointsLines } from '../../context/pointsLinesContext'
import { IconVehicle } from '../../components/Map/IconVehicle'
import ICONSUBIR from '../../assets/images/polygon.svg'

const { confirm } = Modal
const { Option } = Select

const linesData = [
  {
    lat1: -12.088125890009097,
    lon1: -77.03389217854566,
    lat2: -12.092280270662577,
    lon2: -77.03335573679237,
  },
  {
    lat1: -12.092280270662577,
    lon1: -77.03335573679237,
    lat2: -12.09263695690265,
    lon2: -77.0361774204146,
  },
  {
    lat1: -12.09263695690265,
    lon1: -77.0361774204146,
    lat2: -12.08895467311964,
    lon2: -77.03672459100294,
  },
  {
    lat1: -12.08895467311964,
    lon1: -77.03672459100294,
    lat2: -12.089195963922396,
    lon2: -77.03335573679237,
  },
  {
    lat1: -12.089195963922396,
    lon1: -77.03335573679237,
    lat2: -12.089195963922396,
    lon2: -77.03952481695502,
  },
  {
    lat1: -12.089195963922396,
    lon1: -77.03952481695502,
    lat2: -12.087716742955145,
    lon2: -77.04438497939576,
  },
]
const lines = [
  [-12.088125890009097, -77.03389217854566],
  [-12.092280270662577, -77.03335573679237],
  [-12.09263695690265, -77.0361774204146],
  [-12.08895467311964, -77.03672459100294],
  [-12.089195963922396, -77.03952481695502],
  [-12.087716742955145, -77.04438497939576],
]

const MarkerList = ({ markers }) => {
  // console.log('points', markers)
  return (
    <>
      {markers.length > 0 &&
        markers.map(marker => (
          <Marker
            key={marker.id}
            position={[marker.latitude, marker.longitude]}
            icon={IconVehicle}
            // eventHandlers={{
            //   click: () => {
            //     onClick()
            //   },
            // }}
          />
        ))}
    </>
  )
}

const ChangeCenter = ({ center, zoom, option }) => {
  const map = useMap()
  map.setView(center,zoom)
  return null
}

const LinesList = ({ lines }) => {
  console.log('xxxxxx', lines)
  return (
    <>
      {lines.length > 0 &&
        lines.map(line => (
          <Polyline 
            key={line.id} 
            positions={[[line.latitude.start,line.latitude.end],[line.longitude.start,line.longitude.end]]} 
            pathOptions={{ color: 'red' }} />
        ))}
    </>
  )
}

export const Editor = () => {

  const {
    points,
    createPoint,
    deletePoint,
    pickLine,
    lines,
    createLine,
    deleteLine,
  } = usePointsLines()

  const [point, setPoint] = useState({
    name: '',
    latitude: '',
    longitude: '',
    color: 'FF000000',
    icon: '',
  })

  const [line, setLine] = useState({
    name: '',
    latitudeStart: '',
    latitudeEnd: '',
    longitudeStart: '',
    longitudeEnd: '',
    color: 'FF000000',
  })

  const [option, setOption] = useState(0)
  const [isOpen, toggle] = useState(false)
  const [color, setColor] = useState('#434343')
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
      width: '20%',
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
      width: '20%',
      render: (_, elem) => (
        <Button text="Delete" onClick={() => showConfirmDelete(elem.key)} />
      ),
    },
  ]

  const createP = async () => {
    if (
      point.name != '' &&
      point.latitude != '' &&
      point.longitude != '' &&
      point.color != ''
    ) {
      await createPoint({
        name: point.name,
        latitude: point.latitude,
        longitude: point.longitude,
        color: color,
        icon: point.icon,
      })
      setPoint({
        name: '',
        latitude: '',
        longitude: '',
        color: 'FF000000',
        icon: '',
      })
    }
    else 
      message.warning('Completar los campos')

  }

  const createL = async () => {
    if (
      line.name != '' &&
      line.latitudeStart != '' &&
      line.longitudeStart != '' &&
      line.latitudeEnd != '' &&
      line.longitudeEnd != '' &&
      line.color != ''
    ) {
      await createLine({
        name: line.name,
        latitude: {
          start: line.latitudeStart,
          end: line.latitudeEnd,
        },
        longitude: {
          start: line.longitudeStart,
          end: line.longitudeEnd,
        },
        color: line.color,
        width: 2,
      })
      setLine({
        name: '',
        latitudeStart: '',
        latitudeEnd: '',
        longitudeStart: '',
        longitudeEnd: '',
        color: 'FF000000',
      })
    }
    else 
      message.warning('Completar los campos')
  }

  let x =-12.104500
  let y =-77.036779
  if(option == 0 && points[points.length - 1] )
    x=points[points.length - 1].latitude

  if(option == 1 && lines[lines.length - 1])
    x=lines[lines.length - 1]?.latitude?.start

  if(option == 0 && points[points.length - 1] )
    y=points[points.length - 1].longitude

  if(option == 1 && lines[lines.length - 1])
    y=lines[lines.length - 1]?.longitude?.end

  const zoom = 13

  //modal

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
              <div className='flex justify-between'>
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
                <div className='w-4/12'>
                  <Button type="primary" text={<img className="w-5/12 m-auto h-5 py-1" src={ICONSUBIR} />} onClick={showModal} />
                  <Modal title="" visible={isModalVisible} 
                  // onOk={handleOk} 
                  onCancel={handleCancel}
                  footer={null}
                  >
                          <div className='border-dashed border-2 relative mt-10 py-5 px-5 h-20 '>
                            <input className='btnFile' type='file'/>
                            <div className='text-center flex justify-center'>
                              <p className='mr-3'>Seleccionar icono</p>
                              <img className='rounded-full h-7 border-blue-500 rounded w-7 bg-blue-500 py-2 px-2' src={ICONSUBIR} />
                            </div>
                          </div>
                          <div className='m-auto w-3/12 mt-3'>
                            <Button type='primary' text={'Cargar'}></Button>
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
                value={option == 0 ? point.latitude : line.latitudeStart}
                onChange={event => {
                  option == 0
                    ? setPoint({ ...point, latitude: event.target.value })
                    : setLine({ ...line, latitudeStart: event.target.value })
                }}
                placeholder="Escribe latitud"
              />
            </div>
            <div className="w-5/12">
              <label>Longitud</label>
              <Input
                value={option == 0 ? point.longitude : line.latitudeEnd}
                onChange={event => {
                  option == 0
                    ? setPoint({ ...point, longitude: event.target.value })
                    : setLine({ ...line, latitudeEnd: event.target.value })
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
                  value={line.longitudeStart}
                  onChange={event => {
                    setLine({ ...line, longitudeStart: event.target.value })
                  }}
                  placeholder="Escribe latitud"
                />
              </div>
              <div className="w-5/12">
                <label>Longitud</label>
                <Input
                  value={line.longitudeEnd}
                  onChange={event => {
                    setLine({ ...line, longitudeEnd: event.target.value })
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
                onClick={option == 0 ? createP : createL}
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
              <Button type="warning" text="Descargar Excel" />
            </div>
          </div>
        </div>
        <div className="w-6/12 shadow-lg shadow-blue-500/50  rounded mr-5">
          <Table
            size="small"
            scroll={{
              y: 250,
            }}
            rowClassName={(_, index) =>
              index % 2 === 0 ? 'py-2' : 'bg-gray-100 py-2'
            }
            bordered
            dataSource={
              option == 0
                ? points.map(elem => {
                    return {
                      name: elem.name,
                      key: elem.id,
                      latitude: elem.latitude,
                      longitude: elem.longitude,
                    }
                  })
                : lines.map(elem => {
                    return {
                      name: elem.name,
                      key: elem.id,
                      latitude: elem.latitude.start,
                      longitude: elem.longitude.start,
                    }
                  })
            }
            columns={columns}
            pagination={false}
          />
        </div>
      </div>
      <div className="flex grow relative border-t border-gray-200 w-full">
        <div className="bg-blue-500 w-full">
          <MapContainer
            center={[x,y]}
          >
            <ChangeCenter
              center={[x,y]}
              zoom={zoom}
              option={option}
            />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {option == 0 &&<MarkerList markers={points} />}
            {option == 1 && <LinesList lines={lines} />}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}
