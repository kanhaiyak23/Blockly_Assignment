import { useEffect, useRef } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';



const VehicleMarker = ({ currentLocation }) => {
  const markerRef = useRef(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng([currentLocation.latitude, currentLocation.longitude]);
    }
  }, [currentLocation]);

  const vehicleIcon = L.divIcon({
    html: `
      <div class="relative">
        <div class="absolute -top-2 -left-2 w-8 h-8 bg-blue-100 rounded-full animate-pulse"></div>
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#2563EB">
            <path d="M6.5 2a4.5 4.5 0 0 0-4.5 4.5v11a4.5 4.5 0 0 0 4.5 4.5h11a4.5 4.5 0 0 0 4.5-4.5v-11A4.5 4.5 0 0 0 17.5 2h-11zm5.5 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm-6.5-5a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0z"/>
            <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM7 12a5 5 0 1 1 10 0 5 5 0 0 1-10 0z"/>
            <path d="M12 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
          </svg>
        </div>
      </div>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  return (
    <Marker
      ref={markerRef}
      position={[currentLocation.latitude, currentLocation.longitude]}
      icon={vehicleIcon}
    />
  );
};

export default VehicleMarker;