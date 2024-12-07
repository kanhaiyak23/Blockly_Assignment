import { Polyline } from 'react-leaflet';




const RoutePolyline = ({ routePath, currentIndex }) => {
  const positions = routePath.map(loc => [loc.latitude, loc.longitude] );
  
  const completedPositions = positions.slice(0, currentIndex + 1);
  const remainingPositions = positions.slice(currentIndex);

  return (
    <>
      <Polyline positions={completedPositions} color="#4CAF50" weight={4} />
      <Polyline positions={remainingPositions} color="#9E9E9E" weight={4} dashArray="10, 10" />
    </>
  );
};

export default RoutePolyline;