const StepperControl = ({ handleSubmit, currentStep, steps }) => {
  const isBackDisabled = currentStep === 1;
  return (
    <div className="container flex justify-around m-1">
      {/* Back button */}
      <button
        onClick={() => handleSubmit("back")}
        disabled={isBackDisabled}
        className={`bg-[#ffffff] text-[#718096] uppercase py-2 px-8 rounded-xl font-thin 
    cursor-pointer border-2 border-[#8993a4] hover:bg-[#3e4e62] hover:text-[#ffffff] transition 
    duration-200 ease-in-out ${
      currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
    }`}
      >
        Back
      </button>

      {/* Next/Confirm button */}
      <button
        onClick={() => handleSubmit("next")}
        className="bg-[#4CAF50] text-[#ffffff] uppercase py-2 px-8 rounded-xl font-thin
  cursor-pointer hover:bg-[#3e4e62] hover:text-[#ffffff] transition 
  duration-200 ease-in-out"
      >
        {currentStep === steps.length - 1 ? "Confirm" : "Next"}
      </button>
    </div>
  );
};

export default StepperControl;
