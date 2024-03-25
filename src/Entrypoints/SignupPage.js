import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
// import SignupAuthentication from "./VerificationPopup";

function SignUp({ change }) {
  const [data, setData] = useState("");
  const [verify, setVerify] = useState(false);

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

  const mail = () => {
    setVerify(true);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format: 'example@gmail.com'")
      .required("Required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .required("Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain atleast one uppercase, one lowercase, one digit, and one special character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: validationSchema,

    onSubmit: async (values) => {
      console.log(values);

      axios
        .post(`${base_url}/users`, values)
        .then((res) => {
          formik.resetForm();
          alert("User created successfully");
        })
        .catch((err) => alert(`Some error occurred ==> ${err.message}`));
    },

    // try {
    //   const response = await fetch("/api/users", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(values),
    //   });

    //   const result = await response.json();
    //   switch (response.status) {
    //     case 201:
    //       setData(result.message);
    //       mail();
    //       break;
    //     case 400:
    //       setData(result.message);
    //       break;
    //     case 403:
    //       setData(result.message);
    //       break;
    //     case 409:
    //       setData(result.message);
    //       break;
    //     case 500:
    //       setData(result.message);
    //       break;
    //     default:
    //       setData("An error occurred while processing your request.");
    //       break;
    //   }
    // } catch (error) {
    //   console.log("Error sending data:", error);
    // }
  });

  return (
    <>
      {verify && (
        <div className="fixed z-50 inset-0">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Centered content */}
            <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-md">
              {/* <SignupAuthentication onClose={() => setVerify(false)} /> */}
            </div>
          </div>
        </div>
      )}
      <div className="w-[25rem] h-[35rem] bg-[white] shadow-lg flex flex-col absolute justify-around items-center m-auto rounded-[10px] py-5 max-sm:w-[20rem]">
        <h1 className="text-2xl text-primary font-semibold font-asset">
          NAIJA 01
        </h1>
        <div>
          <form
            // onSubmit={formik.handleSubmit}
            className=" w-80 h-auto flex flex-col justify-between gap-8 "
          >
            <div>
              <input
                className="h-10 px-3 py-2 bg-white border-2 border-[#0c7c3f] shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none placeholder:italic placeholder:text-base placeholder:text-[#565872]  placeholder:font-sans focus:border-sky-500 focus:ring-sky-500 block w-80 rounded sm:text-sm focus:ring-1 max-sm:w-60 max-sm:ml-10"
                name="email"
                type="email"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-xs text-[red] max-sm:ml-10">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="">
              <input
                className="h-10 px-3 py-2 bg-white border-2 border-[#0c7c3f] shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none placeholder:italic placeholder:text-base placeholder:text-[#565872]  focus:border-sky-500 focus:ring-sky-500 block w-80 rounded sm:text-sm focus:ring-1 max-sm:w-60 max-sm:ml-10"
                name="password"
                type="text"
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-xs text-[red] max-sm:ml-10">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div>
              <input
                className="h-10 px-3 py-2 bg-white border-2 border-[#0c7c3f] shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none placeholder:italic placeholder:text-base placeholder:font-sans placeholder:text-[#565872] block w-80 rounded sm:text-sm focus:ring-1 max-sm:w-60 max-sm:ml-10"
                name="confirmPassword"
                type="text"
                placeholder="Confirm password"
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-xs text-[red] max-sm:ml-10">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
          </form>
        </div>
        <div className="max-sm:mx-auto">
          {data && (
            <p className="text-center text-xs text-[red] mb-5">{data}</p>
          )}
          <button
            type="Submit"
            onClick={formik.handleSubmit}
            className="bg-[#0c7c3f] text-[white] h-12 w-[20rem] text-xl font-medium rounded font-[serif] cursor-pointer border-[1px] border-[#d2dbef] hover:bg-[#d2dbef] hover:text-[black] hover:bg-opacity-15 max-sm:w-[11.4rem]"
          >
            Create account
          </button>
          <p className="font-sans text-xl text-[#565872] text-center max-sm:mx-auto">
            or
          </p>
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
        <div className="flex flex-row justify-center gap-2">
          <p className="text-base text-[#565872]">Already have an account?</p>
          <span
            onClick={change}
            className="text-base text-[#0c7c3f] font-bold cursor-pointer"
          >
            Login
          </span>
        </div>
      </div>
    </>
  );
}

export default SignUp;
