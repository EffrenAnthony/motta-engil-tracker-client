import { MapContainer, TileLayer } from 'react-leaflet'
import { useLocations } from '../../context/locationsContext'

import LocationMarker from './LocationMarker'

const MarkerList = ({ markers, getHistory, isHistory }) => {
  console.log('markers', markers)
  return (
    <>
      {markers.length > 0 &&
        markers.map(marker => (
          <LocationMarker
            onClick={() => getHistory(marker.userId)}
            key={marker._id}
            // position={[-16.4054894, -71.5626081]}
            position={[
              marker.latitude || -16.4054894,
              marker.longitude || -71.5626081,
            ]}
            description={marker?.user?.name}
            date={marker?.dls}
            isHistory={isHistory}
          />
        ))}
    </>
  )
}

// const mockNewPositions = (positions) => {
//   return positions.map(marker => {
//     return {
//       ...marker,
//       lat: Number(marker.lat) + 0.0002,
//       lng: Number(marker.lng) + 0.0002,
//     }
//   })
// }

function MapView() {
  const { vehicles, getHistory, history, pickVehicle, vehicleSelected } =
    useLocations()

  const clickvehicle = userId => {
    pickVehicle(true)
    getHistory(userId)
  }
  // useEffect(() => {
  //   const markerList = async () => {
  //     const markers = await getMarkers()
  //     setVehicles(markers)
  //   }
  //   if (vehicles.length <= 0) {
  //     markerList()
  //   }
  //   // setTimeout(() => {
  //   //   const newVehicles = mockNewPositions(vehicles)
  //   //   setVehicles(newVehicles)
  //   // }, 1000)
  // }, [vehicles])
  // useEffect(() => {
  //   const connection = updated => {
  //     // debugger
  //     const markers = [...vehicles]
  //     const markerUpdated = markers.filter(marker => marker._id === updated._id)
  //     const markerIndex = markers.indexOf(markerUpdated[0])
  //     markers[markerIndex] = updated
  //     setVehicles(markers)
  //   }
  //   socket.on('tracker', connection)

  //   return () => {
  //     socket.off('tracker', connection)
  //   }
  // }, [socket, vehicles])

  const center = [
    vehicles[vehicles.length - 1]
      ? vehicles[vehicles.length - 1].latitude
      : -16.39889,
    vehicles[vehicles.length - 1]
      ? vehicles[vehicles.length - 1].longitude
      : -71.535,
  ]
  console.log('centro', center)
  return (
    <MapContainer center={center} zoom={7} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerList
        markers={vehicleSelected ? history : vehicles}
        getHistory={clickvehicle}
        isHistory={vehicleSelected}
      />
    </MapContainer>
  )
}

export default MapView
