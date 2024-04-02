import { useState, useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StatesAndLGAs from "./necessarydata.json";

export default function StepOne() {
  const { userData, setUserData } = useContext(StepperContext);
  const [genderOptions] = useState(["Male", "Female"]);

  // Error states
  const [fullNameError, setFullNameError] = useState("");
  const [dobError, setDobError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [stateError, setStateError] = useState("");
  const [lgaError, setLgaError] = useState("");

  const handleBlur = (field, value) => {
    switch (field) {
      case "fullName":
        setFullNameError(value.trim() ? "" : "*This is a required field.");
        break;
      case "dob":
        setDobError(value ? "" : "*This is a required field.");
        break;
      case "gender":
        setGenderError(value ? "" : "*This is a required field.");
        break;
      case "address":
        setAddressError(value.trim() ? "" : "*This is a required field.");
        break;
      case "state":
        setStateError(value ? "" : "*This is a required field.");
        break;
      case "lga":
        setLgaError(value ? "" : "*This is a required field.");
        break;
      default:
        break;
    }
  };

  const handleChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleDobChange = (date) => {
    setUserData({ ...userData, dob: date }); 
    setDobError("Invalid format");
  };
  return (
    <div className="flex flex-col">
      <div className="container mx-auto px-4 lg:px-0 bg-[#ffffff]">
        <div className="max-w-2xl mx-auto ">
          <div className="text-[#000000] font-semibold text-lg max-md:max-w-full max-md:mt-2 max-sm:text-xs max-sm:mt-1">
            Full Name
            <input
              className={`w-full max-sm:text-xs items-center font-thin border flex shrink-0 h-[32px] py-2 flex-col max-md:max-w-full mt-2 pl-3 rounded-xl ${
                fullNameError
                  ? "border-[#f44336]"
                  : "border-solid border-[#388e3c]"
              }`}
              type="text"
              value={userData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              onBlur={() => handleBlur("fullName", userData.fullName)}
              placeholder="Enter full name (as it appears in documents)"
            />
            {fullNameError && (
              <p className="text-[#f44336] max-sm:text-xs font-light h-4 mt-1">
                {fullNameError}
              </p>
            )}
          </div>

          <div className="mt-2 max-sm:mt-1 max-md:max-w-full">
            <div className="gap-4 flex max-md:flex-col max-md:items-stretch max-md:gap-0 ">
              <div className="items-stretch grow flex flex-col max-md:max-w-full lg:w-1/2 max-md:mt-2 max-sm:mt-1">
                <div className="text-black text-lg font-semibold max-md:max-w-full max-sm:text-xs">
                  Date of Birth
                </div>
                <div className="items-stretch border flex justify-between h-[32px] gap-0 mt-2 px-2 rounded-xl border-solid border-[#388e3c] max-md:max-w-full max-md:flex-wrap max-md:px-2">
                  <DatePicker
                    className="max-sm:pt-2 text-[#000000] text-lg font-thin focus:outline-none grow max-sm:text-xs"
                    selected={userData.dob}
                    onChange={handleDobChange}
                    placeholderText="MM/DD/YYYY"
                    onBlur={() => handleBlur("dob", userData.dob)}
                  />
                </div>
                {dobError && (
                  <p className="text-[#ef4444] max-sm:text-xs h-4 mt-1">
                    {dobError}
                  </p>
                )}
              </div>

              <div className="items-stretch grow flex flex-col max-md:max-w-full lg:w-1/2 max-sm:mt-1 max-md:mt-2">
                <div className="text-[#000000] text-lg font-semibold max-md:max-w-full max-sm:text-xs">
                  Gender
                </div>
                <div className="relative">
                  <select
                    className="mt-2 px-2 h-[32px] border-solid w-full border border-[#388e3c] rounded-xl"
                    value={userData.selectedGender}
                    onChange={(e) =>
                      handleChange("selectedGender", e.target.value)
                    }
                    onBlur={() => handleBlur("gender", userData.selectedGender)}
                    style={{
                      color: userData.selectedGender ? "#000000" : "#808080",
                    }}
                  >
                    <option
                      style={{ color: "#000000", fontWeight: "thin" }}
                      value=""
                      disabled
                    >
                      Select
                    </option>
                    {genderOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {genderError && (
                  <p className="text-[#ef4444] mt-1 max-sm:text-xs">
                    {genderError}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="text-black text-lg max-sm:mt-1 font-semibold max-sm:text-xs mt-2 max-md:max-w-full">
            Contact Address
          </div>
          <div className="items-stretch gap-5 mt-2 max-sm:mt-1 max-md:max-w-full max-md:flex-wrap">
            <input
              className={`text-black text-lg w-full flex justify-center max-sm:text-xs items-stretch border grow px-2 h-[32px] rounded-xl border-solid ${
                addressError ? "border-[#ef4444]" : "border-[#388e3c]"
              } max-md:max-w-full max-md:px-2`}
              placeholder="Home Address"
              type="text"
              value={userData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              onBlur={() => handleBlur("address", userData.address)}
            />
            {addressError && (
              <p className="text-[#ef4444] max-sm:text-xs h-4 mt-1">
                {addressError}
              </p>
            )}
          </div>

          {/* LGA/State Field */}
          <div className="items-stretch max-sm:mt-1 flex justify-evenly gap-1.5 max-md:max-w-full mt-2 max-md:flex-wrap">
            <div
              className={`flex items-stretch border max-sm:mt-1 justify-between max-sm:text-xs h-[32px] mt-2 px-2 w-full rounded-xl border-solid ${
                stateError ? "border-[#ef4444]" : "border-[#388e3c]"
              } max-md:max-w-full max-md:flex-wrap lg:w-1/2 max-md:px-2`}
            >
              <select
                value={userData.state}
                onChange={(e) =>
                  setUserData({ ...userData, state: e.target.value })
                }
                name="state"
                className="max-sm:flex max-sm:align-middle text-[#000000] font-thin focus:outline-none max-sm:text-xs text-lg grow"
                style={{ color: userData.state ? "#000000" : "#9ca3af" }}
              >
                <option style={{ color: "#000000" }} value="" disabled>
                  Select State
                </option>
                {StatesAndLGAs.map((state) => (
                  <option key={state.state} value={state.state}>
                    {state.state}
                  </option>
                ))}
              </select>
              {stateError && (
                <p className="text-[#ef4444] max-sm:text-xs h-4 mt-1">
                  {stateError}
                </p>
              )}
            </div>

            <div
              className={`flex items-stretch border max-sm:mt-1 justify-between max-sm:text-xs h-[32px] mt-2 px-2 w-full rounded-xl ${
                lgaError ? "border-[#ef4444]" : "border-[#388e3c]"
              } max-md:max-w-full max-md:flex-wrap lg:w-1/2 max-md:px-2`}
            >
              <select
                value={userData.lga}
                onChange={(e) =>
                  setUserData({ ...userData, lga: e.target.value })
                }
                name="lga"
                className="max-sm:flex max-sm:align-middle text-[#000000] font-thin focus:outline-none max-sm:text-xs text-lg grow"
                style={{ color: userData.lga ? "#000000" : "#9ca3af" }}
                disabled={!userData.state}
              >
                <option style={{ color: "#000000" }} value="" disabled>
                  Select LGA
                </option>
                {userData.state && 
                StatesAndLGAs.find((state) => state.state === userData.state)
                .lgas.map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
              {lgaError && (
                <p className="text-[#ef4444] max-sm:text-xs h-4 mt-1">
                  {lgaError}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
