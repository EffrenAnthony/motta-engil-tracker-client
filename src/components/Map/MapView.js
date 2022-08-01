import { useEffect, createRef } from 'react'
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet'
import { useMap } from 'react-leaflet/hooks'
import { useLocations } from '../../context/locationsContext'
import moment from 'moment'
import LocationMarker from './LocationMarker'
import { getTime } from './../../helpers/utils'

const MILISECONDS_HOUR = 3600000

const MarkerList = ({
  filters,
  markers,
  getHistory,
  isHistory,
  updateFilters,
  currentRecord,
  setCurrentRecord,
}) => {
  return (
    <>
      {markers.length > 0 &&
        markers.map((marker, pos) => (
          <LocationMarker
            onClickVehicle={() => {
              const timeFilters = {
                startDate: new Date(marker.createdAt),
                endDate: new Date(marker.createdAt + MILISECONDS_HOUR),
                startHour: getTime(new Date(marker.createdAt), true),
                endHour: getTime(
                  new Date(marker.createdAt + MILISECONDS_HOUR),
                  true
                ),
              }
              getHistory({
                userId: marker.userId,
                ...timeFilters,
              })
              updateFilters({
                userId: marker?.userId,
                userName: marker?.user?.name,
                ...timeFilters,
              })
            }}
            key={marker._id}
            position={[
              marker.latitude || -16.4054894,
              marker.longitude || -71.5626081,
            ]}
            user={marker?.user?.name}
            color={marker?.user?.color}
            date={marker?.dls}
            isHistory={isHistory}
            current={currentRecord === pos}
            isLast={markers.length - 1 === pos}
            onClickRecord={() => setCurrentRecord(pos)}
          />
        ))}
    </>
  )
}

const ChangeCenter = ({ center, zoom, vehicleSelected }) => {
  const map = useMap()
  map.setView([
    vehicleSelected ? center[0] - 0.005 : center[0],
    vehicleSelected ? center[1] + 0.005 : center[1],
  ])
}

function MapView({
  filters,
  setUserId,
  currentRecord,
  setCurrentRecord,
  updateFilters,
}) {
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
        setUserId={setUserId}
        currentRecord={currentRecord}
        setCurrentRecord={setCurrentRecord}
        updateFilters={updateFilters}
      />
    </MapContainer>
  )
}

export default MapView
