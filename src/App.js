import React from "react";
import "./App.css";

// import Epp from "./Entrypoints/test";
// import SideNav from "./components/SideNav";
// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Assignment from "./pages/Assignment";
// import Courses from "./pages/Courses";
// import Settings from "./pages/Settings";
// import Reports from "./pages/Reports";
import SignupPage from "./Entrypoints/SignupPage";
// import LoginPage from "./EntryPoint/LoginPage";
import LandingPage from "./Entrypoints/LandingPage";
// import GooglePage from "./EntryPoint/GooglePage";
// import RegistrationForm from "./components/RegistrationForm";
// import UnsuccessfulPopUp from "./components/UnsuccessfulPopup";
// import SuccessPopUp from "./components/successpopup";

function App() {
  // const [openNav, setOpenNav] = useState(false);
  // const open = () => {
  //   setOpenNav(!openNav);
  // };
  // const close = () => {
  //   setOpenNav(!openNav);
  // };

  return (
    <div>
      {/* <Epp /> */}
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/google-signup" element={<GooglePage />} /> */}
          {/* <Route path="/registration" element={<RegistrationForm />} /> */}
          {/* <Route path="/successfulreg" element={<SuccessPopUp />} /> */}
          {/* <Route path="/unsuccessfulreg" element={<UnsuccessfulPopUp />} /> */}
          {/* <Route
            path="/dashboard/*"
            element={
              <SideNav toggle={open} openNav={openNav} close={close}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/assignment" element={<Assignment />} />
                  <Route
                    path="/courses"
                    element={<Courses openNav={openNav} close={close} />}
                  />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </SideNav>
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
