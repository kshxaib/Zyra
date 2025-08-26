import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Customize from "./pages/Customize";
import Home from "./pages/Home";
import { useAuthStore } from "./stores/authStore";
import Loader from "./components/Loader";

const App = () => {
  const { user, checkUser, isCheckingUser } = useAuthStore();

  useEffect(() => {
    checkUser(); 
  }, [checkUser]);

  console.log("user: ", user);

  if (isCheckingUser) {
    return (
    < Loader/>
    );
  }

  return (
    <Routes>
      {/* Root route */}
      <Route
        path="/"
        element={
          user ? (
            user.assistantImage && user.assistantName ? (
              <Home />
            ) : (
              <Navigate to="/customize" />
            )
          ) : (
            <Navigate to="/signin" />
          )
        }
      />

      {/* Signup */}
      <Route
        path="/signup"
        element={!user ? <SignUp /> : <Navigate to="/" />}
      />

      {/* Signin */}
      <Route
        path="/signin"
        element={!user ? <SignIn /> : <Navigate to="/" />}
      />

      {/* Customize */}
      <Route
        path="/customize"
        element={user ? <Customize /> : <Navigate to="/signin" />}
      />
    </Routes>
  );
};

export default App;
