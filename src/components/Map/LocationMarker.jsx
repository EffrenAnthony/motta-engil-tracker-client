import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import IconLocaiton from './IconLocaiton'
import moment from 'moment'

const LocationMarker = ({ position, description, date, onClick }) => {
  return (
    <Marker
      position={position}
      icon={IconLocaiton}
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
