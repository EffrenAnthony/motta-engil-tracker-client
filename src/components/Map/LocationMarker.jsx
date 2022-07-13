import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import { IconVehicle, IconPoint } from './IconVehicle'
import moment from 'moment'

const LocationMarker = ({
  position,
  description,
  date,
  onClick,
  isHistory,
}) => {
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
    </Marker>
  )
}

export default LocationMarker
