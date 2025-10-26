import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})



function MapaRestaurantes({ restaurantes }) {
  return (
    <MapContainer center={[-23.5285, -47.1357]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {restaurantes.map(r => (
        <Marker key={r.id} position={[r.latitude, r.longitude]}>
          <Popup>
            <strong>{r.name}</strong><br />
            {r.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
