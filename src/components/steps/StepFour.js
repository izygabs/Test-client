import { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";

export default function StepFour() {
  const { userData, setUserData } = useContext(StepperContext);


  const aboutusOptions = [
    "Social Media",
    "Internet Ad",
    "Friend/Colleague",
    "Other means",
  ];

  const handleChange = (e) => {
    const { name, value,checked } = e.target;
    setUserData({ ...userData, 
      [name]: e.target.type === "checkbox" ? checked : value });
  };


  return (
    <div>
      {/* HOW DID YOU HEAR ABOUT US SECTION */}
      <div className="items-stretch grow flex flex-col max-md:max-w-full lg:w-full max-sm:mt-1 max-md:mt-2">
        <div className="text-[#000000] text-lg font-semibold mt-2 max-sm:text-xs max-sm:mb-2 max-md:max-w-full">
          How did you hear about us?
        </div>
        <div className="relative">
          <select
            className="border-solid border w-full h-[32px] px-2 border-[#388e3c] rounded-xl"
            onClick={(e) => e.stopPropagation()}
            onChange={handleChange}
            name="selectedHearAboutUs"
            value={userData.selectedHearAboutUs}
            style={{ color: userData.selectedHearAboutUs ? '#000000' : '#808080'}}
          >
            <option
              className={`text-lg text-[#000000] grow max-sm:text-xs ${
                userData.selectedHearAboutUs ? "" : "italic text-[#9ca3af]"
              }`}
              value=""
            >
              Select a channel.
            </option>

            {aboutusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-start text-[#000000] text-lg max-sm:text-xs max-sm:mt-2 mt-2 font-light text-start max-md:max-w-full">
        Information collected in this form will be used solely for the purpose
        of course enrollment.
      </div>

      {/* Terms and Conditions Section */}
      <div className="items-stretch flex flex-row py-4 mt-2 max-md:max-w-full max-md:flex-wrap">
        <input
          type="checkbox"
          className={`border ${
            userData.isTermsChecked ? "bg-[#2f8d47]" : "bg-[#ffffff]"
          } flex w-[30px] shrink-0 max-sm:h-[20px] h-[30px] flex-col my-auto border-solid border-[#388e3c]`}
          onClick={(e) => e.stopPropagation()}
          onChange={handleChange}
          name="isTermsChecked"
          checked={userData.isTermsChecked}
        />
        <p className="px-2 text-black text-lg max-sm:text-xs max-sm:mt-2 font-light grow max-md:max-w-full">
          I have read and agree to the terms and conditions.
        </p>
      </div>
    </div>
  );
}
