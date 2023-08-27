import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginForm from "./Login";
import SignupForm from "./Signup";
import Home from "./Home";
import Profile from "./Profile";
import Create from "./Create";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
