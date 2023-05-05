import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import { useState } from "react";


import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from './pages/SignupPage/SignupPage';

import userService from './utils/userService';



export default function App() {

  const [user, setUser] = useState(userService.getUser())

  function handleSignUpOrLogin(){
    setUser(userService.getUser())
  }

    // are we logged in?
    return (
      <Routes>
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
      </Routes>
    );
}

