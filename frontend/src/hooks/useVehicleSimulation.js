import { useState, useEffect, useCallback } from "react";

export const useVehicleSimulation = (routeData) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex + 1 >= routeData.length) {
            setIsRunning(false);
            return prevIndex;
          }
          return prevIndex + 1;
        });
      }, 2000); 
    }
    return () => clearInterval(interval);
  }, [isRunning, routeData]);

  const startSimulation = useCallback(() => {
    setCurrentIndex(0);
    setIsRunning(true);
  }, []);

  const stopSimulation = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetSimulation = useCallback(() => {
    setIsRunning(false);
    setCurrentIndex(0);
  }, []);

  return {
    currentLocation: routeData[currentIndex],
    routePath: routeData,
    currentIndex,
    isRunning,
    startSimulation,
    stopSimulation,
    resetSimulation,
  };
};
