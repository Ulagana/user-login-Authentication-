import React, { useState, useRef } from "react";
import "./SignInSignUp/SignInSignUp.css";
import { useNavigate } from 'react-router-dom';

function SignInPage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSignIn = () => {
    if (
      emailRef.current.value &&
      passwordRef.current.value &&
      !error
    ) {
      const usersData = JSON.parse(localStorage.getItem("users"));
      const foundUser = usersData[emailRef.current.value];
      console.log('foundUser',usersData);
      if (foundUser) {
        if (foundUser.password === passwordRef.current.value) {
          // Navigate to LoginDetailsPage
          alert("Login successful!!");
          window.location.reload(); 
          navigate('/login'); // navigate to /logindetails page
        } else {
          alert("Invalid password");
        }
      } else {
        alert("User not found");
        // navigate('/');
      }
    } else {
      alert("Please enter a valid email address");
    }
  };

  return (
    <div className="container">
      <h1>Sign In</h1>
      <div className="input_space">
        <input
          placeholder="Email"
          type="text"
          ref={emailRef}
          onChange={(e) => {
            const newEmail = e.target.value;
            if (!validateEmail(newEmail)) {
              setError('Invalid email address');
            } else {
              setError('');
            }
          }}
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
      <div className="input_space">
        <input placeholder="Password" type="password" ref={passwordRef} />
      </div>
      
      <button className="mx-3" onClick={() => navigate('/')}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}

export default SignInPage;



