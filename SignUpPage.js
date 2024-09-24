import React, { useState, useRef, useEffect } from "react";
import "./SignInSignUp/SignInSignUp.css";
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState('');
  const [users, setUsers] = useState({}); // State to store users as an object
  const navigate = useNavigate();

  useEffect(() => {
    const localUsers = localStorage.getItem("users");
    if (localUsers) {
      setUsers(JSON.parse(localUsers)); // Update state with existing users
    }
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleClick = () => {
    if (
      nameRef.current.value &&
      emailRef.current.value &&
      passwordRef.current.value &&
      !error
    ) {
      const userId = Math.random().toString(36).substr(2, 9); // Generate a unique ID
      const userData = {
        id: userId,
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      // Check if user with same email already exists
      if (users[emailRef.current.value]) {
        alert("Email already exists. Please try a different email address.");
      } else {
        const newUsers = { ...users, [emailRef.current.value]: userData };
        localStorage.setItem("users", JSON.stringify(newUsers));
        setUsers(newUsers); // Update state with new users
        alert("Account created successfully!!");
        navigate('/signin'); // navigate to /signin page
      }
    } else {
      alert("Please enter a valid email address");
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <div className="input_space">
        <input placeholder="Name" type="text" ref={nameRef} />
      </div>
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
  
      <button className='mx-4'onClick={() => navigate('/signin')}>Sign In</button>
      <button onClick={handleClick}>Sign Up</button>
    </div>
  );
}

export default SignUpPage;