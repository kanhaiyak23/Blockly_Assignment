import { useState, useEffect, useCallback } from 'react';


export const useVehicleSimulation = (routeData) => {
  const [vehicleRoute, setVehicleRoute] = useState({
    locations: routeData,
    currentIndex: 0,
  });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval
    
    if (isRunning) {
      interval = setInterval(() => {
        setVehicleRoute((prev) => {
          const nextIndex = prev.currentIndex + 1;
          if (nextIndex >= prev.locations.length) {
            setIsRunning(false);
            return prev;
          }
          return {
            ...prev,
            currentIndex: nextIndex,
          };
        });
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startSimulation = useCallback(() => {
    setVehicleRoute(prev => ({
      ...prev,
      currentIndex: 0
    }));
    setIsRunning(true);
  }, []);

  const stopSimulation = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetSimulation = useCallback(() => {
    setIsRunning(false);
    setVehicleRoute(prev => ({
      ...prev,
      currentIndex: 0
    }));
  }, []);

  return {
    currentLocation: vehicleRoute.locations[vehicleRoute.currentIndex],
    routePath: vehicleRoute.locations,
    currentIndex: vehicleRoute.currentIndex,
    isRunning,
    startSimulation,
    stopSimulation,
    resetSimulation,
  };
};