import React from "react";
import notokLogo from "./Assets/notOKLogo.png"; 
import backgroundImg from "./Assets/backgroundImg.png";
import { Link } from "react-router-dom";

const UnsuccessfulPopUp = ({ onClose, onProceed }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center min-h-screen p-4 justify-center bg-opacity-75 bg-cover" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="bg-gray-700 p-8 rounded-lg w-full md:w-96">
        {/* Close Button */}
        <button className="text-gray-600 text-4xl font-thin absolute border border-solid border-red-600 hover:bg-red-600 top-2 right-2" onClick={onClose}>
          X
        </button>

        {/* OK Logo */}
        <div className="flex justify-center mb-6">
          <img src={notokLogo} alt="OK Logo" className="w-16 h-16" />
        </div>

        {/* Success Message */}
        <p className="text-center text-4xl font-semibold text-red-200 mb-6">
          Registration was unsuccessful.
        </p>

        {/* Tertiary Button */}
       <Link to={"/"} >
          <button
              className="bg-green-700 text-white py-2 px-4 text-2xl rounded-full w-full mb-4 hover:bg-green-600"
              onClick={onProceed}
            >
              Exit
            </button>
       </Link>
      </div>
    </div>
  );
};

export default UnsuccessfulPopUp;


