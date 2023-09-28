import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase';
import "./card.css";

const Card = ({ agency }) => {
    const firebase = useFirebase();
    const ref = firebase.ref;
    const update = firebase.update;
    const database = firebase.database;
    const get = firebase.get;

    const [alert, setAlert] = useState(Array.isArray(agency.alert) ? agency.alert : [agency.alert, '']);
    const [agencyDetails, setAgencyDetails] = useState([]);
    const [coordinates, setCoordinates] = useState([]);

    const toggleAlert = (emailAddress, newAlertValue) => {
        const encodedEmail = emailAddress.replace('.', ',');

        // Create a reference to the agency's location in the database
        const agencyRef = ref(database, `Agency_Info/${encodedEmail}`);

        // Update only the boolean value at index 0 of the 'alert' array
        const updatedAlert = [newAlertValue, alert[1]];

        // Update the 'alert' property in the database
        update(agencyRef, { alert: updatedAlert })
            .then(() => {
                // Alert updated successfully
                console.log(`Alert for agency ${emailAddress} updated to ${newAlertValue}`);
                setAlert(updatedAlert); // Update the local state
            })
            .catch((error) => {
                // Handle errors
                console.error(`Error updating alert: ${error}`);
            });
    };

    // Function to fetch agency coordinates and details
    const fetchAgencyData = () => {
        const Agency_Info = ref(database, 'Agency_Info');

        get(Agency_Info)
            .then((snapshot) => {
                const agencyData = snapshot.val();

                if (agencyData) {
                    // Extract coordinates and details from agency data
                    const coordinatesArray = [];
                    const detailsArray = [];

                    Object.keys(agencyData).forEach((email) => {
                        const agency = agencyData[email];

                        // Assuming userLocation is an array [latitude, longitude]
                        const [latitude, longitude] = agency.userLocation || [0, 0];

                        coordinatesArray.push({ lat: latitude, lon: longitude });
                        detailsArray.push(agency);
                    });

                    setCoordinates(coordinatesArray);
                    setAgencyDetails(detailsArray);

                    console.log("cord",coordinates)
                }
            })
            .catch((error) => {
                console.error('Error fetching agency data:', error);
            });
    };

    useEffect(() => {
        fetchAgencyData();
    }, []);

    return (
        <div className='cardd'>
            {/* Render agency details */}
            <h3>{agency.agencyName}</h3>
            <p>Email: {agency.emailAddress}</p>
            <p>Availability: {agency.availability}</p>
            {/* <p>Capacity: {agency.capacity}</p> */}
            <p>PhoneNumber Contact: {agency.phoneNumber}</p>
            <p>Location: {agency.userLocation}</p>

            <div>
                {alert[0] ? (<p>Alert: true</p>) : (<p>Alert: false</p>)}
            </div>

            <button onClick={() => toggleAlert(agency.emailAddress, !alert[0])}>
                Toggle Alert
            </button>
        </div>
    );
};

export default Card;
