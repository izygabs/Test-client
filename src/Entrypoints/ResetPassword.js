import React from "react";

function ResetPassword() {
  return (
    <div className="h-screen flex items-center justify-center max-sm:pl-32">
      <div className="w-[25rem] h-[32rem] bg-[white] shadow-lg flex flex-col justify-around items-center m-auto rounded-[10px] gap-8">
        <h1 className="text-2xl text-primary font-semibold mt-[2rem]">
          NAIJA 01
        </h1>
        <form className=" w-80 h-20 flex flex-col justify-between gap-8 mb-[4rem] ">
          <input
            className="h-12 mt-1 px-3 py-2 bg-white border-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none placeholder:italic placeholder:text-base placeholder:text-[#565872]  focus:border-[#0c7c3f] focus:ring-[#0c7c3f] block w-80 rounded sm:text-sm focus:ring-1 max-sm:w-60 max-sm:ml-10"
            name="password"
            type="text"
            placeholder="New password"
          />
          <input
            className="h-12 mt-1 px-3 py-2 bg-white border-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none placeholder:italic placeholder:text-base placeholder:font-sans placeholder:text-[#565872] block w-80 rounded sm:text-sm focus:ring-[#0c7c3f] focus:border-[#0c7c3f] max-sm:w-60 max-sm:ml-10"
            name="password"
            type="text"
            placeholder="Confirm new password"
          />
        </form>
        <div>
          <button className="bg-[#0c7c3f] mb-[3rem] text-[white] h-12 w-[20rem] text-xl font-semibold rounded cursor-pointer hover:bg-[#38454F] max-sm:w-60">
            Reset password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
