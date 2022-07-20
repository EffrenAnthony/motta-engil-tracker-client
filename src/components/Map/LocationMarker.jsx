import React from 'react'
import { Marker, Tooltip } from 'react-leaflet'
import { IconVehicle, IconPoint } from './IconVehicle'
import moment from 'moment'

const LocationMarker = ({ position, date, onClick, isHistory, user }) => {
  return (
    <Marker
      position={position}
      icon={isHistory ? IconPoint : IconVehicle}
      eventHandlers={{
        click: () => {
          onClick()
        },
      }}
    >
      {/* <Popup>
        <h2>{description}</h2>
        <h3>
          <strong>
            {moment.unix(date / 1000).format('hh:mm:ss a DD/MM/YYYY')}
          </strong>
        </h3>
      </Popup> */}
      {!isHistory && <Tooltip>{user}</Tooltip>}
    </Marker>
  )
}

export default LocationMarker
