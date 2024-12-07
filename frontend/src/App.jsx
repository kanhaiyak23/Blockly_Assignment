
// import './App.css'
// import "leaflet/dist/leaflet.css";

// import {MapContainer,TileLayer} from "react-leaflet"
// function App() {
//   const position = [51.505, -0.09]

//   return (
//     <MapContainer center={[48.8566, 2.3522]} zoom={13} >
//      <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={position}>
//       <Popup>
//         A pretty CSS3 popup. <br /> Easily customizable.
//       </Popup>
//     </Marker>
//     </MapContainer>
    
//   )
// }

// export default App

import React from 'react';
import Map from './components/Map';
import Controls from './components/Controls';
import { useVehicleSimulation } from './hooks/useVehicleSimulation';
import { dummyRouteData } from './data/dummyRoute';
import { MapPin } from 'lucide-react';

function App() {
  const {
    currentLocation,
    routePath,
    currentIndex,
    isRunning,
    startSimulation,
    stopSimulation,
    resetSimulation,
  } = useVehicleSimulation(dummyRouteData);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-800">Vehicle Tracker</h1>
              </div>
              <Controls
                isRunning={isRunning}
                onStart={startSimulation}
                onStop={stopSimulation}
                onReset={resetSimulation}
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-gray-600">
                Current Position: {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
              </p>
              <p className="text-gray-600">
                Progress: {currentIndex + 1} / {routePath.length}
              </p>
            </div>
          </div>
          <div className="h-[1200px] w-[1300px]">
            <Map 
              currentLocation={currentLocation} 
              routePath={routePath}
              currentIndex={currentIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;