import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp , } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, push, set,get,child ,update} from 'firebase/database';
import { getFirestore, collection, addDoc, } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const FirebaseContext = createContext(null);
const firebaseConfig = {
  apiKey: "AIzaSyCjc2RqDcY0TCYhQWcPNyoFsVPBYjpuObU",
  authDomain: "rescue-2d03b.firebaseapp.com",
  databaseURL: "https://rescue-2d03b-default-rtdb.firebaseio.com",
  projectId: "rescue-2d03b",
  storageBucket: "rescue-2d03b.appspot.com",
  messagingSenderId: "170782670003",
  appId: "1:170782670003:web:1194f90af6b99196f404c6",
  databaseURL:'https://rescue-2d03b-default-rtdb.firebaseio.com/'
};



const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const fireStore = getFirestore(firebaseApp);
const database = getDatabase(firebaseApp);






export const useFirebase = () => useContext(FirebaseContext);


export const FirebaseProvider = (props) => {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, user => {
      console.log(user);
      if (user) {
        setUser(user);
      } else {
        setUser(null)
      }
    });

    
  }, [])

  const logOut = () => {
    signOut(firebaseAuth);
    toast.info("Logout");


  }
  const isLogedIn = user ? true : false;

  
  const singinWithGoogle = () => {


    
        signInWithPopup(firebaseAuth, googleProvider)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed in with Google:", user);
            toast.success("User signed in with Google successfully!", user);
          })
          .catch((error) => {
            console.error("Error signing in with Google:", error);
            toast.error("Error signing in with Google: " + error.message);
          });
    
    
      }

   

      const fetchDataFromDatabase = (firebase, onDataChange) => {
        const database = firebase.database;
        const Agency_Info = firebase.ref(database, 'Agency_Info/');
      
        // Attach a listener to the Agency_Info reference to listen for data changes
        Agency_Info.on('value', (snapshot) => {
          // The 'snapshot' contains the data from the Agency_Info node
          const data = snapshot.val();
      
          // Call the 'onDataChange' callback with the fetched data
          onDataChange(data);
        });
      };

      // Firebase context or utility file



// ...

// Function to search for an agency by email and retrieve location coordinates
 const searchAgencyByEmail = async (firebase, email) => {
  const database = firebase.database;
  const Agency_Info = ref(database, 'Agency_Info/');

  try {
    // Use the `get` method to retrieve data once
    const snapshot = await get(child(Agency_Info, email));

    if (snapshot.exists()) {
      const agencyData = snapshot.val();
      // Assuming the location coordinates are stored in an array
      const locationCoordinates = agencyData.userLocation || [];
      return locationCoordinates;
    } else {
      // Agency with the provided email does not exist
      return null;
    }
  } catch (error) {
    console.error('Error searching for agency:', error);
    return null;
  }
};







    




return (
    <FirebaseContext.Provider value={{ singinWithGoogle,database, ref, push, set,logOut,isLogedIn,fetchDataFromDatabase,user,update,get,}}>
      {props.children}
      <ToastContainer
        position="top-center"
      />
    </FirebaseContext.Provider>
  );

}

