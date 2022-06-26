import * as L from 'leaflet'

const IconLocaiton = L.icon({
  iconUrl: require('../../assets/marker-icon.png'),
  iconRetinaUrl: require('../../assets/marker-icon.png'),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [26.25, 35],
  className: 'leaflet-venue-icon',
})

export default IconLocaiton
