import { useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/BikeMap.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import useMapboxMap from '../hooks/useMapboxMap.ts';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const BikeMap = () => {
  const bikeMapContainerRef = useRef<HTMLDivElement | null>(null);

  useMapboxMap(bikeMapContainerRef);

  return <div id='bike-map-container' ref={bikeMapContainerRef} />;
};

export default BikeMap;
