import { useEffect, createRef } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { useMap } from 'react-leaflet/hooks'
import { useLocations } from '../../context/locationsContext'
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
  if (!isHistory && markers.length > 0) {
    return markers.map((marker, pos) => (
      <LocationMarker
        onClickVehicle={() => {
          const timeFilters = {
            startDate: new Date(marker.timestamp * 1),
            endDate: new Date(marker.timestamp * 1 + MILISECONDS_HOUR),
            startHour: getTime(new Date(marker.timestamp * 1), true),
            endHour: getTime(
              new Date(marker.timestamp * 1 + MILISECONDS_HOUR),
              true
            ),
          }
          getHistory({
            userId: marker.userid,
            ...timeFilters,
          })
          updateFilters({
            userId: marker?.userid,
            userName: marker?.username || '',
            ...timeFilters,
          })
        }}
        key={marker.userid}
        position={[
          marker.data.finRetorno.latitude,
          marker.data.finRetorno.longitude,
        ]}
        user={marker?.username}
        color={marker?.color ?? '#00FF00'}
        isHistory={isHistory}
        current={currentRecord === pos}
        isLast={markers.length - 1 === pos}
        onClickRecord={() => setCurrentRecord(pos)}
        timestamp={marker.timestamp}
      />
    ))
  } else if (isHistory) {
    return markers.map((marker, pos) => (
      <LocationMarker
        key={pos}
        position={[
          marker.latitude || -16.4054894,
          marker.longitude || -71.5626081,
        ]}
        isHistory={isHistory}
        current={currentRecord === pos}
        isLast={markers.length - 1 === pos}
        onClickRecord={() => setCurrentRecord(pos)}
      />
    ))
  }
}

const ChangeCenter = ({ center, zoom }) => {
  const map = useMap()
  useEffect(() => {
    map.invalidateSize()
    map.setView(center, zoom)
  }, [center])

  return null
}

function MapView({
  filters,
  setUserId,
  currentRecord,
  setCurrentRecord,
  updateFilters,
}) {
  const {
    vehicles,
    getHistory,
    history,
    pickVehicle,
    vehicleSelected,
    center,
  } = useLocations()
  const mapRef = createRef()

  const clickVehicle = userId => {
    pickVehicle(true)
    getHistory(userId)
  }

  const zoom = 14
  return (
    <MapContainer
      ref={mapRef}
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
    >
      <ChangeCenter center={center} zoom={zoom} />
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
