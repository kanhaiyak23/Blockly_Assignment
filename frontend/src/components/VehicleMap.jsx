import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px',
};

const VehicleMap = () => {
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [directions, setDirections] = useState(null);
  const [routePath, setRoutePath] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.2090 });

  const newDelhiCoordinates = { lat: 28.6139, lng: 77.2090 };

  const handleMapClick = (event) => {
    if (!startPoint) {
      setStartPoint({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      setEndPoint(null);
      setRoutePath([]);
      setCurrentIndex(0);
      setDirections(null);
    } else if (!endPoint) {
      setEndPoint({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    } else {
      setStartPoint({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      setEndPoint(null);
      setDirections(null);
      setRoutePath([]);
      setCurrentIndex(0);
      setIsMoving(false);
    }
  };

  useEffect(() => {
    if (startPoint && endPoint) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: startPoint,
          destination: endPoint,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            const path = result.routes[0].overview_path;
            setRoutePath(path);

            const bounds = new window.google.maps.LatLngBounds();
            path.forEach((latLng) => bounds.extend(latLng));
            setMapCenter(bounds.getCenter());
            window.map.fitBounds(bounds);
          } else {
            console.error('Error fetching directions:', status);
          }
        }
      );
    }
  }, [startPoint, endPoint]);

  useEffect(() => {
    if (isMoving && routePath.length > 0) {
      const id = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex + 1 >= routePath.length) {
            clearInterval(id);
            return prevIndex;
          }
          return prevIndex + 1;
        });
      }, 200);
      setIntervalId(id);
    }

    return () => clearInterval(intervalId);
  }, [isMoving, routePath]);

  const handleStart = () => {
    if (routePath.length > 0) {
      setIsMoving(true);
    }
  };

  const handleStop = () => {
    setIsMoving(false);
    clearInterval(intervalId);
  };

  const handleReset = () => {
    setIsMoving(false);
    clearInterval(intervalId);
    setCurrentIndex(0);
    setStartPoint(null);
    setEndPoint(null);
    setRoutePath([]);
    setDirections(null);
    setMapCenter(newDelhiCoordinates);

    if (window.map) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(newDelhiCoordinates);
      window.map.fitBounds(bounds);
      window.map.setZoom(14);
    }
  };

  const getRotationAngle = (index) => {
    if (index < 1 || index >= routePath.length) return 0;

    const from = routePath[index - 1];
    const to = routePath[index];

    const heading = window.google.maps.geometry.spherical.computeHeading(from, to);
    return heading;
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-blue-600 text-white text-center font-bold">
          Vehicle Route Simulator
        </div>

        <div className="p-4 flex justify-center space-x-4">
          <button
            onClick={handleStart}
            disabled={!routePath.length || isMoving}
            className={`
              px-6 py-2 rounded-md transition-all duration-300 
              ${routePath.length && !isMoving 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
            `}
          >
            Start
          </button>
          <button
            onClick={handleStop}
            disabled={!isMoving}
            className={`
              px-6 py-2 rounded-md transition-all duration-300
              ${isMoving 
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
            `}
          >
            Stop
          </button>
          <button
            onClick={handleReset}
            className="
              px-6 py-2 bg-red-500 text-white rounded-md 
              hover:bg-red-600 transition-all duration-300
            "
          >
            Reset
          </button>
        </div>

        <div className="p-4">
          <LoadScript googleMapsApiKey="AIzaSyDndyDfIC2rgnOgpP5E_XWtCVJDpojPFsw" libraries={['geometry']}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter}
              zoom={14}
              onClick={handleMapClick}
              onLoad={(map) => { window.map = map; }}
            >
              {startPoint && <Marker position={startPoint} />}
              {endPoint && <Marker position={endPoint} />}
              {directions && <DirectionsRenderer directions={directions} />}
              {routePath.length > 0 && currentIndex < routePath.length && (
                <Marker
                  position={routePath[currentIndex]}
                  icon={{
                    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    scaledSize: new window.google.maps.Size(30, 30),
                    rotation: getRotationAngle(currentIndex)
                  }}
                />
              )}
            </GoogleMap>
          </LoadScript>
        </div>

        <div className="p-4 bg-gray-100 text-center text-sm text-gray-600">
          Click on the map to set start and end points
        </div>
      </div>
    </div>
  );
};

export default VehicleMap;
