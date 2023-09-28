import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import './map.css'; // Import the CSS file
import { Link, useNavigate,useParams } from 'react-router-dom';

const DirMap = (props) => {
  const mapRef = useRef(null);

  
  const { accidentLocation, userLocation } = useParams();
//   console.log('Accident Location:', accidentLocation);
//   console.log('User Location:', userLocation);
//   const agencyCoordinates = agencyLoc.split(','); // Split agency location
//   const accidentCoordinates = accidentLoc.split(','); // Split accident location

//   const [distanceValue, setDistanceValue] = useState(null);

//   useEffect(() => {
//     if (!mapRef.current) {
//       mapRef.current = L.map('map').setView([20.5937, 78.9629], 5);
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(mapRef.current);

//       var routing = L.Routing.control({
//         routeWhileDragging: true,
//       }).addTo(mapRef.current);

//       function createLocationButton(location) {
//         var button = document.createElement('button');
//         button.textContent = 'Show Directions to ' + location.agencyName;

//         button.addEventListener('click', function () {
//           routing.setWaypoints([
//             L.latLng(accidentCoordinates[0], accidentCoordinates[1]), // Accident location
//             L.latLng(location.lat, location.lon), // Agency location
//           ]);

//           routing.route(function (error, routes) {
//             if (!error && routes.length > 0) {
//               const totalDistance = routes[0].summary.totalDistance;
//               const distanceInKilometers = totalDistance / 1000;
//               setDistanceValue(distanceInKilometers.toFixed(2));
//             } else {
//               setDistanceValue(null);
//             }
//           });
//         });

//         return button;
//       }

//       var locationButtons = document.getElementById('locationButtons');
//       props.parsedDistances.forEach(function (location) {
//         var button = createLocationButton(location);
//         locationButtons.appendChild(button);
//       });
//     }
//   }, [props.parsedDistances, accidentCoordinates]);

//   return (
//     <div>
//       <div id="map" className="map-container"></div>
//       <div id="locationButtons" className="location-buttons"></div>

//       {distanceValue && (
//         <div className="distance-info">
//           <p>Distance between Accident and Agency: {distanceValue} km</p>
//         </div>
//       )}
//     </div>
//   );
// };
}

export default DirMap;
