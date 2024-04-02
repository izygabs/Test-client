import React, { useState } from "react";
import Stepper from "./Stepper";
import StepperControl from "./StepperControl";
import { StepperContext } from "../contexts/StepperContext";
import { UploadedFileProvider } from "../contexts/UploadedFileContext";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import StepFour from "./steps/StepFour";
import Final from "./steps/Final";

function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [finalData, setFinalData] = useState("");
  const [userData, setUserData] = useState({
    fullName: "",
    dob: "",
    selectedGender: "",
    address: "",
    state: "",
    lga: "",
    phoneNumber: "",
    nin: "",
    certificateFile: "",
    selectedHighestQualification:"",
    selectedAvailableIdCard: "",
    idCardFront: "",
    idCardBack: "",
    selectedPreferredCourse: "",
    selectedHearAboutUs: "",
    isTermsChecked: ""
  });

  const steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Complete"];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
      case 5:
        return <Final />;
      default:
        return null;
    }
  };

  // const handleClick = (direction) => {
  //   let newStep = currentStep;

  //   direction === "next" ? (newStep += 1) : (newStep -= 1);

  //   // Check if steps are within bounds
  //   newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  // };

  const isStepValid = (userData) => {
    return Object.values(userData).every(value=> {
      if (typeof value === 'string') {
        return value.trim() !== '';
      } else if (Array.isArray(value)) {
        return value.length > 0;
      } else {
        return value !== null && value !== undefined;
      }
      })
  }

  const handleSubmit = (direction) => {
    if (direction === "back") {
      setCurrentStep(currentStep - 1);
      return;
    }
  
    if (currentStep === steps.length - 1) {
      if (isStepValid(userData)) {
        console.log(userData)
        setCurrentStep(5);
        return;
      } else {
        alert("Please fill in all fields before proceeding.");
        return;
      }
    }
    setCurrentStep (currentStep + 1)
 
    // if (currentStep === steps.length - 1) {
    //   // alert ('Form submitted')
    //   // RegisterUser(e);
    //   console.log(userData)
    // } else {
    //   setCurrentStep (currentStep + 1)
    // }
  };

  return (
  
    <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-[#ffffff] absolute max-sm:w-[20rem]">
      {/* Stepper */}
      <div className="container horizontal mt-2">
        <Stepper steps={steps} currentStep={currentStep} />
      </div>

      {/* Display components */}

      <div className="my-2 p-6">
      <UploadedFileProvider>
        <StepperContext.Provider value={{userData, setUserData, finalData, setFinalData}}>
          {displayStep(currentStep)}
        </StepperContext.Provider>
      </UploadedFileProvider>
      </div>

      {/* Navigation controls */}
      {currentStep !== steps.length && (
        <StepperControl
          steps={steps}
          // handleClick={handleClick}
          currentStep={currentStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>

  );
}

export default RegistrationForm;
