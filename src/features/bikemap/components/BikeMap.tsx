import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { bikeMapConfig } from '../utils/bikeMapConfig.ts';
import '../styles/BikeMap.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const BikeMap = () => {
  const bikeMapContainerRef = useRef<HTMLDivElement | null>(null);
  const bikeMapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!bikeMapContainerRef.current) return;

    const bikeMapInstance = new mapboxgl.Map({
      container: bikeMapContainerRef.current,
      ...bikeMapConfig,
    });

    bikeMapRef.current = bikeMapInstance;
  }, []);

  return <div id='bike-map-container' ref={bikeMapContainerRef} />;
};

export default BikeMap;
