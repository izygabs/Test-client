import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "./images/bdmp.png";
import { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import SignUp from "./SignupPage";
import axios from "axios";
import ResetPassword from "./ResetPassword";
// import RegistrationForm from "../components/RegistrationForm";
// import EmailReset from "./EmailReset";

function Landing() {
  const [popup, setPopup] = useState(false);
  const [signup, setSignup] = useState(false);
  const [reg, setReg] = useState(false);
  const [reset, setReset] = useState(false);
  const [success, setSuccess] = useState(false);

  console.log("process.env:", process.env);
  console.log(
    "process.env.REACT_APP_NODE_ENV:",
    process.env.REACT_APP_NODE_ENV
  );
  console.log(
    "process.env.REACT_APP_SERVER_BASE_URL:",
    process.env.REACT_APP_SERVER_BASE_URL
  );

  const base_url =
    process.env.REACT_APP_NODE_ENV === "development"
      ? process.env.REACT_APP_LOCAL_BASE_URL
      : process.env.REACT_APP_SERVER_BASE_URL;

  const popsign = () => {
    setPopup(false);
    setReg(false);
    // setSuccess(false);
    setSignup(true);
  };

  const change = () => {
    setSignup(false);
    setReg(false);
    // setSuccess(false);
    setPopup(true);
  };

  const openReg = () => {
    setPopup(false);
    setSignup(false);
    // setSuccess(false);
    setReg(true);
  };

  const openSuccess = () => {
    setPopup(false);
    setSignup(false);
    setReg(false);
    setSuccess(true);
  };

  const resetEmail = () => {
    setReset(true);
    setPopup(false);
    setSignup(false);
  };

  const pop = () => {
    setTimeout(change, 3000);
  };
  useEffect(() => {
    pop();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),

    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      console.log(values);

      axios
        .post(`${base_url}/login`, values)
        .then((res) => {
          formik.resetForm();
          alert("Welcome back User!");
        })
        .catch((err) => alert("Some error occurred"));
    },
  });

  return (
    <div className="h-screen w-full flex flex-col justify-around items-center bg-[#0c7c3f] max-sm:w-[100%] max-sm:h-screen max-sm:bottom-0 max-sm:">
      <div className="flex flex-col gap-16">
        <div className="flex justify-center">
          <img
            src={logo}
            alt="logo"
            className="w-48 motion-safe:animate-spin"
          />
        </div>
        <div>
          <h1 className="text-[white] font-normal text-4xl font-sans text-center">
            Hello from <br /> <br />{" "}
            <span className="font-bold font-asset max-sm:text-2xl">
              Naija 01
            </span>
          </h1>
        </div>
      </div>

      {popup && (
        <div className="w-[25rem] h-[35rem] bg-[white] shadow-lg flex flex-col absolute justify-around items-center m-auto rounded-[10px] py-5 max-sm:w-[20rem]">
          {/* // <div className="w-[25rem] h-[35rem] shadow-2xl bg-[white] flex flex-col justify-around items-center m-auto absolute py-5 rounded-[10px] backdrop-blur-3xl backdrop-brightness-150 max-sm:w-[20rem]"> */}
          <h1 className="text-2xl text-primary font-semibold font-asset">
            NAIJA 01
          </h1>
          <div className="gap-4 max-sm:flex flex-col justify-center max-sm:ml-20">
            <form
              onSubmit={formik.handleSubmit}
              className=" w-80 h-auto flex flex-col justify-between gap-8"
            >
              <div>
                <input
                  className="h-10 px-3 py-2 border-2 border-[#0c7c3f] shadow-sm placeholder-slate-400 focus:outline-none placeholder:italic placeholder:text-base placeholder:text-[#565872]  placeholder:font-sans focus:border-[#0c7c3f] focus:ring-sky-500 block w-80 rounded sm:text-sm focus:ring-1 max-sm:w-60"
                  name="email"
                  type="email"
                  placeholder="Email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-xs text-[red]">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="gap-1">
                <input
                  className="h-10 px-3 py-2 bg-white border-2 border-[#0c7c3f] shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none placeholder:italic placeholder:text-base placeholder:text-[#565872]  placeholder:font-sans  focus:border-sky-500 focus:ring-sky-500 block w-80 rounded sm:text-sm focus:ring-1 max-sm:w-60"
                  name="password"
                  type="text"
                  placeholder="Password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-xs text-[red]">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
            </form>
            <div className="flex flex-row justify-between w-[20rem] mt-2 text-sm font-sans max-sm:w-[15rem] max-sm:text-sm">
              <div className="flex flex-row gap-1">
                <input type="checkbox" />
                <p className="text-[#565872]">Remember me</p>
              </div>
              <span
                onClick={resetEmail}
                className="text-[#0c7c3f] font-bold cursor-pointer"
              >
                Forgot password?
              </span>
            </div>
          </div>
          <div className="items-center">
            {/* <Link to={"/dashboard"}> */}
            <button
              type="Submit"
              onClick={formik.handleSubmit}
              // onClick={openSuccess}
              className="bg-[#0c7c3f] text-[white] h-10 w-[20rem] max-sm:w-[180px] text-xl font-medium rounded font-[serif] cursor-pointer border-[1px] border-[#d2dbef] hover:bg-[#d2dbef] hover:text-[black] hover:bg-opacity-15 "
            >
              Login
            </button>
            {/* </Link> */}
            <p className="font-sans text-xl text-[#565872] text-center ">or</p>
            <div className="max-sm:hidden">
              <GoogleLogin
                className=""
                width={"320px"}
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
            <div className="sm:hidden">
              <GoogleLogin
                className="max-sm:w-[200px]"
                // width={"320px"}
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          </div>
          <div className="flex flex-row justify-center gap-2 font-sans">
            <p className="text-[14px] text-[#565872]">
              Don't have an account yet?
            </p>
            <span
              onClick={popsign}
              className="text-[14px] text-[#0c7c3f] font-bold cursor-pointer"
            >
              Signup
            </span>
          </div>
        </div>
      )}
      {signup && <SignUp change={change} />}
      {/* {success && <RegistrationForm />} */}
      {reset && <ResetPassword />}
    </div>
  );
}

export default Landing;
