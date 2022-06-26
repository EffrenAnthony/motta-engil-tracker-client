import { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { http } from '../../helpers/http'
import { useVehicles } from '../../hooks/useVehicles'
import { getMarkers } from '../../services/markers'

import LocationMarker from './LocationMarker'

const MarkerList = ({ markers }) => {
  useEffect(() => {}, [markers])
  return (
    <>
      {markers.length > 0 &&
        markers.map(marker => (
          <LocationMarker
            key={marker._id}
            position={[marker.latitude, marker.longitude]}
            description={marker?.user?.name}
            date={marker?.dls}
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
  const { vehicles } = useVehicles()
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
  console.log(vehicles)

  return (
    <MapContainer
      center={[-16.39889, -71.535]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerList markers={vehicles} />
    </MapContainer>
  )
}

export default MapView
