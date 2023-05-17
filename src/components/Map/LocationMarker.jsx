import React from 'react'
import { Marker, Tooltip, CircleMarker } from 'react-leaflet'
import TriangleIcon from '../TriangleIcon'
import * as ReactDOMServer from 'react-dom/server'
const COLORS = {
  red: '#F92323',
  green: '#00B912',
  blue: '#006EB9',
}

const LocationMarker = ({
  position,
  onClickVehicle,
  isHistory,
  user,
  timestamp,
  color,
  current,
  isLast,
  onClickRecord,
  degrees = 0,
}) => {
  return !isHistory ? (
    <CircleMarker
      center={position}
      pathOptions={{ color, weight: 12 }}
      radius={6}
      eventHandlers={{
        click: () => {
          onClickVehicle()
        },
      }}
    >
      <Tooltip>
        {user}
        <br />
        {timestamp && new Date(timestamp * 1).toString()}
      </Tooltip>
    </CircleMarker>
  ) : (
    <Marker
      position={position}
      eventHandlers={{
        click: () => {
          onClickRecord()
        },
      }}
      icon={L.divIcon({
        className: 'leaflet-venue-icon',
        html: ReactDOMServer.renderToString(
          <TriangleIcon
            fill={isLast ? COLORS.red : current ? COLORS.green : COLORS.blue}
            degrees={degrees}
          />
        ),
      })}
    />
  )
}

export default LocationMarker
