import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const GOOGLE_MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY;

const containerStyle = {
  width: "100%",
  height: "600px",
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

  const handleMapClick = (event) => {
    if (!startPoint) {
      setStartPoint({ lat: event.latLng.lat(), lng: event.latLng.lng() });
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
    setMapCenter({ lat: 28.6139, lng: 77.2090 });
  };

  return (
    <div>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <LoadScript
        googleMapsApiKey="AIzaSyDndyDfIC2rgnOgpP5E_XWtCVJDpojPFsw"
        libraries={['geometry']} // Load the geometry library
      >
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
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default VehicleMap;
