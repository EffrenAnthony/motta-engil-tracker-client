import { useEffect, createRef } from 'react'
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet'
import { useMap } from 'react-leaflet/hooks'
import { useLocations } from '../../context/locationsContext'

import LocationMarker from './LocationMarker'

const MarkerList = ({filters, markers, getHistory, isHistory, setUserId }) => {
  return (
    <>
      {markers.length > 0 &&
        markers.map(marker => (
          <LocationMarker
            onClick={() => {
              getHistory({
              ...filters,
              userId: marker.userId,
            })
            console.log(marker)
            setUserId(marker?.user?.name)}
          }
            key={marker._id}
            position={[
              marker.latitude || -16.4054894,
              marker.longitude || -71.5626081,
            ]}
            user={marker?.user?.name}
            date={marker?.dls}
            isHistory={isHistory}
          />
        ))}
    </>
  )
}

const ChangeCenter = ({ center, zoom, vehicleSelected }) => {
  const map = useMap()
  const zoomP = vehicleSelected ? zoom + 2 : zoom
  map.setView(
    [
      vehicleSelected ? center[0] - 0.005 : center[0],
      vehicleSelected ? center[1] + 0.005 : center[1],
    ],
    zoomP
  )
  return null
}

function MapView({filters ,setUserId}) {
  const { vehicles, getHistory, history, pickVehicle, vehicleSelected } =
    useLocations()
  const mapRef = createRef()

  const clickVehicle = userId => {
    pickVehicle(true)
    getHistory(userId)
  }

  const center = [
    vehicleSelected && history[history.length - 1]
      ? history[history.length - 1].latitude
      : vehicles[vehicles.length - 1]
      ? vehicles[vehicles.length - 1].latitude
      : -16.39889,
    vehicleSelected && history[history.length - 1]
      ? history[history.length - 1].longitude
      : vehicles[vehicles.length - 1]
      ? vehicles[vehicles.length - 1].longitude
      : -71.535,
  ]

  const zoom = 13
  return (
    <MapContainer
      ref={mapRef}
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
    >
      <ChangeCenter
        center={center}
        zoom={zoom}
        vehicleSelected={vehicleSelected}
      />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerList
        markers={vehicleSelected ? history : vehicles}
        getHistory={clickVehicle}
        isHistory={vehicleSelected}
        filters={filters}
        setUserId = {setUserId}
      />
    </MapContainer>
  )
}

export default MapView
