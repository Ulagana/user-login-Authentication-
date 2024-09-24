import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./log.css";


function LoginDetailsPage() {
  const localUsers = localStorage.getItem("users");
  const navigate = useNavigate();
  const location = useLocation();

  console.log("Current location:", location.pathname);

  if (!localUsers) {
    // If no users are found, redirect to signin page
    navigate('/signin', { replace: true }); 
    return null;
  }

  try {
    const usersData = JSON.parse(localUsers);
    console.log("usersData:", usersData); // Log the parsed data

    const handleLogOut = () => {
      localStorage.removeItem("users");
      window.location.reload(); 
      navigate('/signin', { replace: true }); 
    };

    window.history.forward();
    window.onpopstate = function(event) {
      window.history.forward();
    };

 
    // window.onbeforeunload = function(event) {
    //   event.preventDefault();
    //   event.returnValue = '';
    // };

    return (
      <div className="container">
        <h1>Login Details</h1>
        {usersData && (
    <h3>Welcome. "{usersData[Object.keys(usersData)[0]].name}"</h3>
  )}
        

        
        <table>
          <thead>
            <tr> 
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(usersData).map((key, index) => (
              <tr key={index}>
                <td>{usersData[key].name}</td>
                <td>{usersData[key].email}</td>
                <td>{usersData[key].password}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="mt-4 mx-5" onClick={handleLogOut}>Log Out</button>
      </div>
    );
  } catch (error) {
    console.error("Error parsing usersData:", error);
    return <div>Error loading user data</div>;
  }
}

export default LoginDetailsPage;