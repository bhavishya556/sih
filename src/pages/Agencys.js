import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { Link, useNavigate } from "react-router-dom";
import { ref, onValue } from 'firebase/database';
import {FiHome } from "react-icons/fi";
import "./agency.css"

import Map from '../comp/Map';
import Card from '../comp/Card';

const Agencys = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [agencyData, setAgencyData] = useState([]);
  const [userLocations, setUserLocations] = useState([]);
  const [filteredAgencies, setFilteredAgencies] = useState([]);
  const [filterRadius, setFilterRadius] = useState(10); // Set the default filter radius to 10 km
  const [userLatitude, setUserLatitude] = useState('');
  const [userLongitude, setUserLongitude] = useState('');
  const [distances, setDistances] = useState([]);
  const [km, setKm] = useState([]);

  const logout = () => {
    firebase.logOut();
    navigate("/login");
  };
  const login = () => {
    firebase.logOut();
    navigate("/login");
  };

  const handleAddAgency = () => {
    navigate("/list");
  };

  // Function to calculate the distance between two sets of coordinates (in kilometers)
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  const calculateDistances = () => {
    const userLat = parseFloat(userLatitude);
    const userLon = parseFloat(userLongitude);

    const calculatedDistances = userLocations.map((location, index) => {
      const distance = calculateDistance(userLat, userLon, location.lat, location.lon);
      const agencyInfo = agencyData[index]; // Get agency information for this location
      const { agencyName, emailAddress } = agencyInfo; // Extract name and email

      // Add coordinates to the result
      return {
        name: `Agency ${index + 1}`,
        distance: `${distance.toFixed(2)} km`, // Round distance to 2 decimal places
        agencyName, // Include agencyName in the result
        emailAddress, // Include emailAddress in the result
        lat: location.lat, // Add latitude
        lon: location.lon, // Add longitude
        userLatitude, // Add user's latitude
        userLongitude, // Add user's longitude
      };
    });

    // Filter locations within 10 km
    const filteredDistances = calculatedDistances.filter(
      (location) => parseFloat(location.distance) <= km // Change 500 to 10 for a 10 km radius
    );

    setDistances(filteredDistances);
  };


  const filterAgencies = () => {
    // Filter agencies based on the selected filter radius
    const filtered = agencyData.filter((agency) => {
      const distance = calculateDistance(agency.userLocation, userLocations[0]);
      return distance <= filterRadius;
    });
    setFilteredAgencies(filtered);
  };

  const onDataChange = (data) => {
    if (data) {
      const agencies = Object.values(data);
      setAgencyData(agencies);

      // Extract and store agency details, including agencyName, emailAddress, and userLocation
      const locations = agencies.map((agency) => {
        const { agencyName, emailAddress, userLocation } = agency; // Extract agencyName, emailAddress, and userLocation

        // Check if userLocation is defined and not empty before splitting
        const [latitude, longitude] = userLocation ? userLocation.split(',').map(parseFloat) : [0, 0];

        return { agencyName, emailAddress, lat: latitude, lon: longitude };
      });
      setUserLocations(locations);
    }
  };

  useEffect(() => {
    // Create a reference to the 'Agency_Info' location in the database
    const database = firebase.database;
    const Agency_Info = ref(database, 'Agency_Info/');

    // Use the .on method to listen for changes in the data
    const unsubscribe = onValue(Agency_Info, (snapshot) => {
      const data = snapshot.val();
      onDataChange(data);
    });

    // Clean up the listener when the component unmounts
    return () => {
      // Unsubscribe from the data listener using the `off` method
      unsubscribe();
    };
  }, [firebase]);

  // Use another useEffect to log userLocations whenever it changes
  useEffect(() => {
    console.log("cord", userLocations);
    filterAgencies(); // Call the filter function when userLocations change
  }, [userLocations, filterRadius]);

  console.log("dis", distances);
  console.log("agency all data", agencyData);

  return (
    <div >
      <div className='hero-con'>


        <div className='hero-left'>
          <button onClick={handleAddAgency}>Add agency</button>
          <button onClick={logout}>Logout</button>
          <button >Inventery</button>
        </div>

        <div className='hero-right'>

          <div className='hero-nav'>
            <FiHome style={{
              fontSize:"30px",
              margin:"20px 0px"
            }}/>
            <h2>All Agency List</h2>

          </div>

          <div className='hero-main'>

            <p>
              {agencyData.map((agency, index) => (
                <Card key={index} agency={agency} />
                // You can access other properties of the agency here as well
              ))}
              
            </p>

          </div>

        </div>
      </div>

      <h1>Home</h1>
      <label>
        Filter Radius (km):
        <input
          type="number"
          value={km}
          onChange={(e) => setKm(Number(e.target.value))}
        />
      </label>



      <button onClick={handleAddAgency}>Add agency</button>

      {/* Render userLocations on the screen */}
      <h2>User Locations</h2>
      <ul>
        {filteredAgencies.map((location, index) => (
          <li key={index}>Latitude: {location.lat}, Longitude: {location.lon}</li>
        ))}
      </ul>

      <div>
        <h1>Distance Calculator</h1>
        <p>Enter your coordinates (latitude and longitude) and click "Calculate" to find the distances to random locations in India within 10 km.</p>

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

        <h2>Distances to Random Locations in India within nearby </h2>
        <ul>
          {distances.map((location, index) => (
            <li key={index}>
              Agency Name: {location.agencyName}<br />
              Email: {location.emailAddress}<br />
              Distance: {location.distance}
              Lat: {location.lat}
              Log: {location.lon}
              userLatitude:{userLatitude}
              userLongitude:{userLongitude}
              <Link to={`/map/${JSON.stringify(distances)}`}>View Map</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Agencys;