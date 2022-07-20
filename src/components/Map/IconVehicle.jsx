import * as L from 'leaflet'

const IconVehicle = L.icon({
  iconUrl: require('../../assets/images/vehicle-icon.png'),
  iconRetinaUrl: require('../../assets/images/vehicle-icon.png'),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: 'leaflet-venue-icon',
})

const IconPoint = L.icon({
  iconUrl: require('../../assets/images/point-icon.png'),
  iconRetinaUrl: require('../../assets/images/point-icon.png'),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [20, 20],
  className: 'leaflet-venue-icon',
})

export { IconVehicle, IconPoint }
