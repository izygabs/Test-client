import React, { useState, useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";
import { useUploadedFile } from '../../contexts/UploadedFileContext';

export default function StepTwo() {
  const { userData, setUserData } = useContext(StepperContext);
  const [certificateFile, setCertificateFile] = useState(null); 
  const [isHighestQualificationDropdownOpen, setIsHighestQualificationDropdownOpen] = useState(false);
  const { uploadedFile, setUploadedFile } = useUploadedFile();

  const eduQualificationOptions = [
    "SSCE",
    "Bachelor's Degree",
    "Master's Degree",
    "PhD",
  ];
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [ninError, setNINError] = useState("");

  const handleChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input) && input.length <= 11) {
      handleChange("phoneNumber", input);
      setPhoneNumberError("");
    } else {
      setPhoneNumberError("11 digits are required.");
    }
  };

  const handleNINChange = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input) && input.length <= 11) {
      handleChange("nin", input);
      setNINError("");
    } else {
      setNINError("11 digits are required.");
    }
  };

  const handleHighestQualificationSelect = (highestqualification) => {
    handleChange("selectedHighestQualification", highestqualification);
    setIsHighestQualificationDropdownOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
  };


  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        
        {/* Phone Number & NIN Section*/}
        <div className="mt-2 max-md:max-w-full">
          <div className="flex max-md:flex-col gap-4 max-md:items-stretch max-md:gap-0">
            <div className="items-stretch flex grow flex-col max-md:max-w-full max-md:mt-2.5 lg:w-1/2">
              <div className="text-black text-lg font-semibold max-sm:text-xs max-md:max-w-full">
                Phone Number
              </div>
              <input
                className={`text-black text-lg max-sm:text-xs justify-center border mt-2 pl-2 rounded-xl h-[32px] border-solid ${
                  phoneNumberError ? "border-[#f44336]" : " border-[#388e3c]"
                } items-start max-md:max-w-full max-md:px-2`}
                type="number"
                value={userData.phoneNumber || ""}
                onChange={handlePhoneNumberChange}
                placeholder="08012345678"
              />
              {phoneNumberError && (
                <p className="text-[#f44336] mt-1">{phoneNumberError}</p>
              )}
            </div>

            <div className="items-stretch flex grow flex-col max-md:max-w-full max-md:mt-2 lg:w-1/2">
              <div className="text-[#000000] text-lg font-semibold max-sm:text-xs max-md:max-w-full">
                NIN
              </div>
              <input
                className="text-[#000000] text-lg max-sm:text-xs justify-center border mt-2 max-sm:pr-6 pl-2 rounded-xl h-[32px] border-solid border-[#388e3c]"
                type="number"
                value={userData.nin || ""}
                onChange={handleNINChange}
                placeholder="Enter NIN"
              />
              {ninError && <p className="text-[#f44336] mt-1">{ninError}</p>}
            </div>
          </div>
        </div>

        {/* HIGHEST QUALIFICATION SECTION */}
        <div className="items-stretch grow flex flex-col max-md:max-w-full lg:w-full max-sm:mt-1 max-md:mt-2">
          <div className="text-[#000000] text-lg font-semibold mt-2 max-sm:pb-2 max-sm:text-xs max-md:max-w-full">
            Highest Educational Qualification
          </div>
          <div className="relative">
            <select
              className="mt-2 px-2 h-[32px] border-solid w-full border border-[#388e3c] rounded-xl"
              value={userData.selectedHighestQualification}
              onChange={(e) => handleChange("selectedHighestQualification", e.target.value)}
              onClick={() =>
                setIsHighestQualificationDropdownOpen(
                  !isHighestQualificationDropdownOpen
                )
              }
              style={{ color: userData.selectedHighestQualification ? '#000000' : '#808080' }}
            >
              <option
                className={`max-sm:pt-2 grow max-sm:text-xs text-sm ${
                  userData.selectedHighestQualification
                    ? "text-[#388e3c]"
                    : "text-[#9ca3af] italic"
                }`}
              >
                {userData.selectedHighestQualification || "Select most recent qualification"}
              </option>
            </select>
            {isHighestQualificationDropdownOpen && (
              <div className="absolute flex flex-col mt-2 max-sm:mt-1 w-full bg-[#ffffff] border border-solid border-[#388e3c] rounded-md">
                {eduQualificationOptions.map((option) => (
                  <div key={option} className="p-2 cursor-pointer hover:bg-[#d1d5db]"
                    onClick={() => handleHighestQualificationSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Upload academic certificate */}
        <div className="text-[#000000] text-lg font-semibold max-sm:text-xs mt-2  max-sm:pb-2 max-md:max-w-full">
          Upload certificate
        </div>
        <div className="items-stretch border flex justify-between py-1 rounded-xl border-solid border-[#388e3c] max-md:max-w-full max-md:flex-wrap">
          <input
            className="text-[#000000] max-sm:text-xs text-start pl-2 text-lg grow my-auto max-md:max-w-full"
            type="file"
            onChange={(e) => {
              handleFileChange(e, setCertificateFile);
              handleChange("certificateFile", e.target.value);
            }}
          />

        </div>
      </div>
    </div>
  );
}
