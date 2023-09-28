import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import 'leaflet-routing-machine';
import './map.css'; // Import the CSS file

const Map = (props) => {
  const mapRef = useRef(null);
  let { distance } = useParams();
  const parsedDistances = JSON.parse(distance);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([20.5937, 78.9629], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);

      var routing = L.Routing.control({
        routeWhileDragging: true,
      }).addTo(mapRef.current);

      // Function to create a button for each location
// Function to create a button for each location
function createLocationButton(location) {
  var button = document.createElement('button');
  button.textContent = 'Show Directions to ' + location.agencyName; // Use agencyName for button text

  button.addEventListener('click', function () {
    // Set waypoints for routing control
    routing.setWaypoints([
      L.latLng(parsedDistances[0].userLatitude, parsedDistances[0].userLongitude), // Accident location
      L.latLng(location.lat, location.lon), // Agency location
    ]);

    // Calculate and show route
    routing.route();
  });

  return button;
}


      // Create buttons for each agency in parsedDistances
      var locationButtons = document.getElementById('locationButtons');
      parsedDistances.forEach(function (location) {
        var button = createLocationButton(location);
        locationButtons.appendChild(button);
      });
    }
  }, [parsedDistances]);

  return (
    <div>
      {/* Map container */}
      <div id="map" className="map-container"></div>

      {/* Container for location buttons */}
      <div id="locationButtons" className="location-buttons"></div>
    </div>
  );
};

export default Map;
