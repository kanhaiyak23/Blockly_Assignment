// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import L from "leaflet";

// const vehicleIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
//   iconSize: [30, 30],
// });

// const Map = () => {
//   const [locations, setLocations] = useState([]);
//   const [currentLocation, setCurrentLocation] = useState(null);

//   useEffect(() => {
//     const fetchLocations = async () => {
//       const { data } = await axios.get("http://localhost:8000/api/vehicle-location");
//       console.log(data)
//       setLocations(data);
//       setCurrentLocation(data[data.length - 1]); // Latest location
//     };

//     fetchLocations();
//     const interval = setInterval(fetchLocations, 5000); // Poll every 5 seconds

//     return () => clearInterval(interval);
//   }, []);

//   if (!currentLocation) return <div>Loading...</div>;

//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <MapContainer
//         key={currentLocation ? currentLocation.latitude : "default"} // Re-initialize on location change
//         center={[currentLocation.latitude, currentLocation.longitude]}
//         zoom={14}
//         style={{ height: "100%", width: "100%" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker
//           position={[currentLocation.latitude, currentLocation.longitude]}
//           icon={vehicleIcon}
//         />
//         <Polyline
//           positions={locations.map(({ latitude, longitude }) => [latitude, longitude])}
//           color="blue"
//           weight={3}
//         />
//       </MapContainer>
//     </div>
//   );
  
// };

// export default Map

