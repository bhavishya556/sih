import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase'
import {Link,useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



 const Login = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        if(firebase.isLogedIn){
            navigate("/");
        }
    },[firebase,navigate])

    

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        try {
            await firebase.SigninUserWithEmailandPassword(email, password);
            // console.log('Login successful.');
            // toast("Wow so easy!");
        } catch (error) {
            console.log('Login failed:', error);
        }
    };



    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="inputBox">
                    <input
                        type="text"
                        placeholder="Email"
             
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="inputBox">
                    <input
                        type="password"
                        placeholder="Password"
                     
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <div className="inputBox">
                    <button type="submit">Login</button>
                </div>

             


            </form>
            <h1>
                    or
                </h1>

                <button onClick={firebase.singinWithGoogle}>singin with google</button>

            <a href='http://localhost:3000/Rig'>singin a/c</a>
           

       
        </div>
    );
}
export default Login;
