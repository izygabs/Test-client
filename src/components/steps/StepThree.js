import React, {useState, useContext} from 'react'
import {StepperContext} from '../../contexts/StepperContext'

export default function StepThree () {
  const { userData, setUserData } = useContext(StepperContext);

  const [idCardFront, setIdCardFront] = useState(null);
  const [idCardBack, setIdCardBack] = useState(null);

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    setter(file);
  };

  const idCardOptions = ["Passport", "Driver's Licence", "National ID Card", "Permanent Voter's Card"];

  const preferredCourseOptions = ["Software Development/Testing", "Data Analysis", "Digital Marketing", "UI/UX Design", "Machine Learning/Automation"];

  const handleChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

return (
  <div className='flex flex-col'>
    <div className='w-full mx-2 flex-1'>

{/* SUPPORTING DOCUMENTS SECTION */}
      <div className="items-stretch grow flex flex-col max-md:max-w-full lg:w-full max-sm:mt-1 max-md:mt-2">
        <div className="text-[#000000] text-lg font-semibold mt-2 max-sm:text-xs max-md:max-w-full">Supporting Documents</div>
        <div className="relative">
          <select
            className="mt-2 px-2 h-[32px] border-solid w-full border border-[#2f8d47] rounded-md"
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => handleChange("selectedAvailableIdCard", e.target.value)}
            name="selectedAvailableIdCard"
            value={userData.selectedAvailableIdCard || ""}
            style={{ color: userData.selectedAvailableIdCard ? '#000000' : '#808080'}}>
            <option className={`max-sm:pt-2 grow max-sm:text-xs ${userData.selectedAvailableIdCard ? 'text-black' : 'text-[#9ca3af] italic'}`}>Select Available ID Card</option>
              {idCardOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
          </select>
        </div>
        </div>
      </div>
      <div className="text-black text-lg font-semibold mt-2 max-sm:text-xs max-md:max-w-full">Upload ID Card</div>
      <div className="items-stretch border flex flex-col px-2 rounded-xl mt-2 border-solid border-[#388e3c] max-md:max-w-full max-md:px-2">
        <form>
          {/* Upload front of selected ID Card */}
          <div className="text-black text-lg font-normal mt-2 max-sm:text-xs max-md:max-w-full">Upload front of selected ID Card</div>
          <div className="items-stretch border flex justify-between pl-1 py-1 rounded-l border-solid border-[#388e3c] max-md:max-w-full max-md:flex-wrap">
            <input 
              className="text-[#000000] text-start text-italic text-lg grow my-auto max-sm:text-xs max-md:max-w-full" 
              type="file" 
              // value={userData.idCardFront || ""}
              onChange={(e) => {
              handleFileChange(e, setIdCardFront);
              handleChange("idCardFront", e.target.value); // Update value in userData
            }}/>
          </div>

          {/* Upload back of selected ID Card */}
          <div className="mb-2">
            <div className="text-[#000000] text-lg font-normal mt-2 max-sm:text-xs max-md:max-w-full">Upload back of selected ID Card</div>
            <div className="items-stretch border flex justify-between pl-1 py-1 rounded-l border-solid border-[#388e3c] max-md:max-w-full max-md:flex-wrap">
              <input 
                className="text-[#000000] italics text-start text-lg grow my-auto max-sm:text-xs max-md:max-w-full" 
                type="file" 
                onChange={(e) => {
                  handleFileChange(e, setIdCardBack);
                  handleChange("idCardBack", e.target.value); // Update value in userData
                }}
              />
            </div>
          </div>
        </form>
      </div>

    {/* PREFERRED COURSE SECTION */}
<div className="items-stretch grow flex flex-col max-md:max-w-full lg:w-full max-sm:mt-1 max-md:mt-2">
  <div className="text-[#000000] text-lg font-semibold mt-2 max-sm:text-xs max-md:max-w-full">Preferred Course</div>
  <div className='relative'>
    <select
      className="mt-2 px-2 h-[32px] border-solid w-full border border-[#388e3c] rounded-md"
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => handleChange("selectedPreferredCourse", e.target.value)}
      name="selectedPreferredCourse"
      value={userData.selectedPreferredCourse || ""}
      style={{ color: userData.selectedPreferredCourse ? '#000000' : '#808080' }}>
      <option className={`max-sm:pt-2 grow max-sm:text-xs ${userData.selectedPreferredCourse ? 'text-[#000000]' : 'text-[#9ca3af] italic'}`}>Select preferred course</option>
      {/* <option className="absolute flex flex-col mt-2 max-sm:text-sm max-sm:mt-1 w-full bg-[#ffffff] border border-solid border-[#388e3c] rounded-md"> */}
        {preferredCourseOptions.map((option) => (
          <option key={option} value={option} className="p-2 cursor-pointer hover:bg-[#d1d5db]">
            {option}
          </option>
        ))}
      {/* </option> */}
    </select>
    
  </div>
</div>
</div>
)

}
