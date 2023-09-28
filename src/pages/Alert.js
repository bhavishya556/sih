import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase';
import { ref, onValue } from 'firebase/database';
import { Link, useParams, useNavigate } from 'react-router-dom';
import "./alert.css"


const AgencyDetails = () => {
  const navigate = useNavigate(); // Add navigate from react-router-dom
  const params = useParams();
  const firebase = useFirebase();
  const database = firebase.database;
  const [agencyEmail, setAgencyEmail] = useState("projectbhavi@gmail,com");
  const [agencyData, setAgencyData] = useState(null);

  const goToDMap = () => {
    const agencyDataString = JSON.stringify(agencyData);
    // Pass agencyData as a route parameter
    navigate(`/dmap/${encodeURIComponent(agencyDataString)}`);
  };
  

  useEffect(() => {
    // Reference to the specific agency's data in the database
    const agencyRef = ref(database, `Agency_Info/${agencyEmail}`);

    // Attach a real-time listener using `on` to listen for changes in the agency's data
    const unsubscribe = onValue(agencyRef, (snapshot) => {
      if (snapshot.exists()) {
        // Data has changed, update agency details
        const data = snapshot.val();
        setAgencyData(data);
      } else {
        // Agency with the specified email does not exist
        setAgencyData(null);
      }
    });

    return () => {
      // Unsubscribe from the listener when the component unmounts
      unsubscribe();
    };
  }, [database, agencyEmail]);


    return (
      <div className="container">
      <Link className='add' to={'/agencys'}>Add Agency</Link>
      <h1>Alert Agency Details</h1>
      <label>
        Agency Email:
        <input
          className="agency-email-input"
          type="text"
          value={agencyEmail}
          onChange={(e) => setAgencyEmail(e.target.value)}
        />
      </label>
      console.log(agencyData)

      {agencyData && (
        <div className="agency-details" 
        style={{
          backgroundColor: !agencyData.alert?.[0]  ? 'red' : 'green',
          width: '200px',
          height: '200px',
        }}>
          <h2>Agency Details</h2>
          <p>Email: {agencyEmail}</p>
      
          <p>alert: {agencyData.alert?.[0] ?(<p>alert!</p>):(<p>fine</p>)}</p>
          <p>Message: {agencyData.alert?.[1]}</p>
          <p>Agency Coordinator: {agencyData.agencyCoordinator}</p>
          <p>Accident Location: {agencyData.accidentLocation}</p>
          <p>User Location: {agencyData.userLocation}</p>
        </div>
      )}

      <button className="get-location-button" onClick={goToDMap}>
        Get Location
      </button>
    </div>
  );
};

export default AgencyDetails;