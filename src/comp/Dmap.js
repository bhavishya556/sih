import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const DMap = () => {
  const { coordinates } = useParams();
  const agencyData = JSON.parse(decodeURIComponent(coordinates));
  
  const { accidentLocation, userLocation } = agencyData; // Extract accidentLocation and userLocation

  useEffect(() => {
    console.log('Accident Location:', accidentLocation);
    console.log('User Location:', userLocation);
    // Use the accidentLocation and userLocation as needed
  }, [accidentLocation, userLocation]);

  return (
    <div>
      {/* Render your DMap component */}
    </div>
  );
};

export default DMap;

