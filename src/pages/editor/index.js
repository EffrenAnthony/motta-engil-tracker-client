import { Select, Menu, Popconfirm } from 'antd'
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'
import { Input } from '../../common/Input'
import { Table } from 'antd'
import { Button } from '../../common/Button'
import React, { useRef, useState, useCallback } from 'react'
import { HexColorPicker } from 'react-colorful'
import useClickOutside from './../../hooks/useClickOutside'
import { usePointsLines } from '../../context/pointsLinesContext'

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
  return (
    <>
      {markers.length > 0 &&
        markers.map(marker => (
          <Marker
            key={marker}
            position={position}
            icon={isHistory ? IconPoint : IconVehicle}
            eventHandlers={{
              click: () => {
                onClick()
              },
            }}
          />
        ))}
    </>
  )
}

export const Editor = () => {
  const { points, createPoint, deletePoint, pickLine, lines, createLine, deleteLine, } = usePointsLines()
  const [point, setPoint] = useState({
    name: "",
    latitude: '',
    longitude: '',
    color: "FF000000",
    icon: '',
  })
  const [line, setLine] = useState({
   name:'',
   latitude: {
       start: '',
       end:''
    },
   longitude: {
       start: '',
       end: ''
    },
   color: '',
   width: 2
})
  const [option, setOption] = useState(0)
  const [isOpen, toggle] = useState(false)
  const [color, setColor] = useState('#434343')
  const popover = useRef()
  const close = useCallback(() => toggle(false), [])

  useClickOutside(popover, close)

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
        <Popconfirm
          title="Seguro que desea eliminar el registro?"
          onConfirm={() => option == 0 ? deletePoint(elem.key):deleteLine(elem.key)}
        >
          <a>Delete</a>
        </Popconfirm>
      ),
    },
  ]

  const createP = async ()=>{
    if(
      point.name != '' &&
      point.latitude != '' &&
      point.longitude != '' &&
      point.color != ''
    ){
      await createPoint({
        name: point.name,
        latitude: point.latitude,
        longitude: point.longitude,
        color: color,
        icon: point.icon,
      })
      setPoint(
        {
          name: "",
          latitude: '',
          longitude: '',
          color: "FF000000",
          icon: '',
        }
      )
    }    
  }

  const createL = async ()=>{
    if(
      line.name != '' &&
      line.latitudeStar != '' &&
      line.longitudeStar != '' &&
      line.latitudeEnd != '' &&
      line.longitudeEnd != '' &&
      line.color != ''
    ){
      await createLine(
        {
        name:line.name,
        latitude: {
            start: line.latitudeStar,
            end:line.latitudeEnd
         },
        longitude: {
            start:line.longitudeStar,
            end: line.longitudeEnd
         },
        color:line.color,
        width: 2
        }
     )
      setLine(
        {
          name:'',
          latitude: {
              start: '',
              end:''
           },
          longitude: {
              start: '',
              end: ''
           },
          color:FF000000,
          width: 2
       }
      )
    }    
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
              value={option == 0 ? point.name:line.name}
              onChange={event => {
                option == 0 ?
                setPoint({ ...point, name: event.target.value }):
                setPoint({ ...line, name: event.target.value })
              }}
              placeholder="Escribe nombre" />
            </div>
            <div className="w-5/12">
              <label>Ícono</label>
              <div>
                <div className="picker">
                  <div
                    className="swatch"
                    style={{ backgroundColor: color }}
                    onClick={() => toggle(true)}
                  />

                  {isOpen && (
                    <div className="popover z-10" ref={popover}>
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
          </div>
          <div className="flex justify-around">
            <div className="w-5/12">
              <label>Latitud</label>
              <Input type="text" 
              value={option == 0 ? point.latitude:line.latitudeStart}
              onChange={event => {
                option == 0 ?
                setPoint({ ...point, latitude: event.target.value }):
                setPoint({ ...line, latitudeStar: event.target.value })
              }}
              placeholder="Escribe latitud" />
            </div>
            <div className="w-5/12">
              <label>Longitud</label>
              <Input 
              value={option == 0? point.longitude:line.longitudeStar}
              onChange={event => {
                option == 0?
                setPoint({ ...point, longitude: event.target.value }):
                setPoint({ ...line, longitudeStar: event.target.value })

              }}
              placeholder="Escribe longitud" />
            </div>
          </div>
          {option == 1 && (
            <div className="flex justify-around">
              <div className="w-5/12">
                <label>Latitud</label>
                <Input type="text" 
                value={line.latitudeEnd}
                onChange={event => {
                  setPoint({ ...line, latitudeEnd: event.target.value })
                }}
                placeholder="Escribe latitud" />
              </div>
              <div className="w-5/12">
                <label>Longitud</label>
                <Input 
                value={line.longitudeEnd}
                onChange={event => {
                  setPoint({ ...line, longitudeEnd: event.target.value })
                }}
                placeholder="Escribe longitud" />
              </div>
            </div>
          )}
          <div className="flex justify-between px-5 pt-3">
            <div className="w-4/12 mr-5">
              <Button
                text="Agregar"
                onClick={option == 0? createP:createL}
                type="secondary"
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
            
            size = 'small'
            scroll={{
              y: 250,
            }}
            rowClassName={(_, index) =>
                index % 2 === 0 ? 'py-2' : 'bg-gray-100 py-2'
            }
            bordered
            dataSource={
              option == 0 ?
              points.map(elem => {
              return {
                name: elem.name,
                key: elem.id,
                latitude: elem.latitude,
                longitude: elem.longitude
                }
              }):
              lines.map(elem => {
              return {
                name: elem.name,
                key: elem.id,
                latitude: elem.latitude.start,
                longitude: elem.longitude.start
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
            center={[-12.08887074583288, -77.03522255409378]}
            zoom={15}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerList markers={[]} />
            <Polyline positions={lines} pathOptions={{ color: 'green' }} />
          </MapContainer>
        </div>
      </div>
    </div>
  )
}
