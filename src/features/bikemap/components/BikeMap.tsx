import { useRef } from 'react';

const BikeMap = () => {
  const bikeMapContainerRef = useRef<HTMLDivElement | null>(null);

  return <div id='bike-map-container' ref={bikeMapContainerRef} />;
};

export default BikeMap;
