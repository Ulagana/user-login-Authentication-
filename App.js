
// import React, { useState, useEffect } from "react";
// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import SignUpPage from "./SignUpPage";
// import SignInPage from "./SignInPage";
// import LoginDetailsPage from "./Logindetails";

// function ProtectedRoute({ children, isAuthenticated }) {
//   if (!isAuthenticated) {
//     return <Navigate to="/signin" replace />;
//   }
//   return children;
// }

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const localUsers = localStorage.getItem("users");
//     if (localUsers) {
//       setIsAuthenticated(true);
//     }
//   }, []);
  

//   const handleLogOut = () => {
//     localStorage.removeItem("users");
//     setIsAuthenticated(false);
//     window.history.pushState(null, null, "/signin"); // Add this line
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" exact element={<SignUpPage />} />
//         <Route path="/signin" element={<SignInPage />} />
//         <Route
//           path="/login"
//           element={
//             <ProtectedRoute isAuthenticated={isAuthenticated}>
//               <LoginDetailsPage onSignOut={handleLogOut} />
//             </ProtectedRoute>
//           }
//           block
//         />
//         <Route path="./SignInPage" element={<Navigate to="/signin" replace />} />  
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;






import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";
import LoginDetailsPage from "./Logindetails";

function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const localUsers = localStorage.getItem("users");
  useEffect(() => {
    if (localUsers) {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleLogOut = () => {
    localStorage.removeItem("users");
    setIsAuthenticated(false);
    window.location.href = "/"; // Redirect to sign-in page after logout
  };
  
  const handleSignIn = () => {
    // Simulate successful sign-in and store user data
    localStorage.setItem("users", JSON.stringify({ /* user data */ }));
    setIsAuthenticated(true);
  };
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect authenticated users from sign-up */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/login" replace /> : <SignUpPage />} 
        />
        {/* Sign-in page */}
        <Route 
          path="/signin" 
          element={isAuthenticated ? <Navigate to="/login" replace /> : <SignInPage onSignIn={handleSignIn} />} 
        />
        {/* Protected login page */}
        <Route 
          path="/login" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <LoginDetailsPage onSignOut={handleLogOut} />
            </ProtectedRoute>
          } 
        />
        {/* Handle other routes */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/login" replace /> : <Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  );  
}

export default App;




