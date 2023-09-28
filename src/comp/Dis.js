import React, { useState } from 'react';

const Dis = () => {
  const [userLatitude, setUserLatitude] = useState('');
  const [userLongitude, setUserLongitude] = useState('');
  const [distances, setDistances] = useState([]);
  
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2); // Round to 2 decimal places
  }

  const calculateDistances = () => {
    const latitude = parseFloat(userLatitude);
    const longitude = parseFloat(userLongitude);

    const randomLocations = [
      { name: "New Delhi", latitude: 28.6129, longitude: 77.2315 },
      { name: "rohit", latitude:28.6064294, longitude:76.9962443 },

      // Add more random locations here
    ];

    const calculatedDistances = randomLocations.map((location) => {
      const distance = calculateDistance(latitude, longitude, location.latitude, location.longitude);
      return { name: location.name, distance: `${distance} km` };
    });

    setDistances(calculatedDistances);
  }

  return (
    <div>
      <h1>Distance Calculator</h1>
      <p>Enter your coordinates (latitude and longitude) and click "Calculate" to find the distances to random locations in India.</p>

      <label htmlFor="latitude">Your Latitude:</label>
      <input
        type="text"
        id="latitude"
        placeholder="Enter your latitude"
        value={userLatitude}
        onChange={(e) => setUserLatitude(e.target.value)}
      /><br />

      <label htmlFor="longitude">Your Longitude:</label>
      <input
        type="text"
        id="longitude"
        placeholder="Enter your longitude"
        value={userLongitude}
        onChange={(e) => setUserLongitude(e.target.value)}
      /><br />

      <button onClick={calculateDistances}>Calculate</button>

      <h2>Distances to Random Locations in India:</h2>
      <ul>
        {distances.map((location, index) => (
          <li key={index}>Distance to {location.name}: {location.distance}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dis;
