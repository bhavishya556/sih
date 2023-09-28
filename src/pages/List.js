import React, { useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const List = () => {
    const firebase = useFirebase();

    // Declare state variables to store form values
    const [agencyName, setAgencyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState(firebase.user.email.replace('.', ','));
    const [userLocation, setUserLocation] = useState("");
    const [accidentLocation, setAccidentLocation] = useState("");
    const [servicesProvided, setServicesProvided] = useState([]);
    const [capacity, setCapacity] = useState('');
    const [availability, setAvailability] = useState('');
    const [emergencyContact, setEmergencyContact] = useState('');
    const [verificationStatus, setVerificationStatus] = useState('');
    const [serviceArea, setServiceArea] = useState('');
    const [specializations, setSpecializations] = useState([]);
    const [alert, setAlert] = useState([false,"msg"]);

   
    

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission



        const database = firebase.database
      // Use the agency's email address as the key
const Agency_Info = firebase.ref(database, `Agency_Info/${emailAddress}`);


        // Generate a new key for the message
       // const newMessageRef = firebase.push(Agency_Info);

        // Set the Agency_Info data under the new key
       // Set the Agency_Info data under the agency's email address
firebase.set(Agency_Info, {
    agencyName,
    accidentLocation,
    phoneNumber,
    emailAddress,
    userLocation,
    servicesProvided,
    capacity,
    availability,
    emergencyContact,
    verificationStatus,
    serviceArea,
    specializations,
    alert
})


        // Handling errors

            .then(() => {
                toast.success("worked")

                // Reset form fields after successful submission
                setAgencyName('');
                setPhoneNumber('');
                setEmailAddress('');
                setUserLocation("");
                setServicesProvided([]);
                setCapacity('');
                setAvailability('');
                setEmergencyContact('');
                setVerificationStatus('');
                setServiceArea('');
                setSpecializations([]);
                setAlert(alert)

            })
            .catch((error) => {
                console.log('Unable to insert data in the database')
                toast.error(error)
            })
    };

    const getUserLocation=()=> {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var userLatitude = position.coords.latitude;
                var userLongitude = position.coords.longitude;
                setUserLocation(userLatitude+","+userLongitude);
              
            });
        } else {
            alert("Geolocation is not supported in your browser.");
        }
    }
    const toggleAlert = () => {
        setAlert(!alert); // Toggle the alert state between true and false
      };
      

    return (
        <form id="registrationForm">
            {/* Input fields */}
            <input type="text" id="agencyName" value={agencyName} onChange={(e) => setAgencyName(e.target.value)} placeholder="Agency Name" />
            <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" />
            <input type="text" id="emailAddress" value={emailAddress} required onChange={(e) => setEmailAddress(e.target.value)} placeholder="Email Address" />
            <input type="text" id="userLocation" value={userLocation} onChange={(e) => setUserLocation(e.target.value)} placeholder="User Location" />
            {/* Checkboxes for Services Provided */}
            <div>
                Services Provided:
                <input type="checkbox" name="servicesProvided" value="Service1" onChange={() => setServicesProvided([...servicesProvided, 'Service1'])} />
                <input type="checkbox" name="servicesProvided" value="Service2" onChange={() => setServicesProvided([...servicesProvided, 'Service2'])} />
                {/* Add more checkboxes as needed */}
            </div>
            <button type="button" onClick={getUserLocation}>Use My Location</button>

            {/* Other input fields */}
            {/* ... */}
            {/* Submit button */}
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
};

export default List;
