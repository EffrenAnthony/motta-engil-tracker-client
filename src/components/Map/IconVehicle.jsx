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
  iconUrl: require('../../assets/images/triangle.svg'),
  iconRetinaUrl: require('../../assets/images/triangle.svg'),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(20, 20),
  className: 'leaflet-venue-icon',
})

const IconPointRed = L.icon({
  iconUrl: require('../../assets/images/point-icon-red.png'),
  iconRetinaUrl: require('../../assets/images/point-icon-red.png'),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [20, 20],
  className: 'leaflet-venue-icon',
})

const IconPointGreen = L.icon({
  iconUrl: require('../../assets/images/point-icon-green.png'),
  iconRetinaUrl: require('../../assets/images/point-icon-green.png'),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [20, 20],
  className: 'leaflet-venue-icon',
})
export { IconVehicle, IconPoint, IconPointRed, IconPointGreen }
