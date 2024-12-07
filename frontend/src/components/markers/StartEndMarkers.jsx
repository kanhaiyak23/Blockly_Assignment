import { MapPin } from 'lucide-react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';




const StartEndMarkers = ({ routePath }) => {
  const startIcon = L.divIcon({
    html: `<div class="text-green-600">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${MapPin.toString()}
      </svg>
      <div class="bg-white text-xs px-1 rounded shadow">Start</div>
    </div>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const endIcon = L.divIcon({
    html: `<div class="text-red-600">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${MapPin.toString()}
      </svg>
      <div class="bg-white text-xs px-1 rounded shadow">End</div>
    </div>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <>
      <Marker
        position={[routePath[0].latitude, routePath[0].longitude]}
        icon={startIcon}
      />
      <Marker
        position={[routePath[routePath.length - 1].latitude, routePath[routePath.length - 1].longitude]}
        icon={endIcon}
      />
    </>
  );
};

export default StartEndMarkers;