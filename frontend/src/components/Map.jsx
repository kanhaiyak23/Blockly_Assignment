import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import StartEndMarkers from './markers/StartEndMarkers';
import VehicleMarker from './markers/VehicleMarker';
import RoutePolyline from './RoutePolyLine';



const Map = ({ currentLocation, routePath, currentIndex }) => {
  return (
    <MapContainer
      center={[currentLocation.latitude, currentLocation.longitude]}
      zoom={14}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutePolyline routePath={routePath} currentIndex={currentIndex} />
      <StartEndMarkers routePath={routePath} />
      <VehicleMarker currentLocation={currentLocation} />
    </MapContainer>
  );
};

export default Map;