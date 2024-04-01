import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function ResetPassword() {
  // const [data, setData] = useState("");

  const base_url =
    process.env.REACT_APP_NODE_ENV === "development"
      ? process.env.REACT_APP_LOCAL_BASE_URL
      : process.env.REACT_APP_SERVER_BASE_URL;

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, "Must be at least 8 characters")
      .required("Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain atleast one uppercase, one lowercase, one digit, and one special character"
      ),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Password must match")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },

    validationSchema: validationSchema,

    onSubmit: async (values) => {
      console.log(values);

      axios
        .post(`${base_url}/resetPassword/:token`, values)
        .then((res) => {
          formik.resetForm();
          alert("Password reset successful");
        })
        .catch((err) => alert("Some error occurred"));
    },
  });

  return (
    <div className="h-screen flex items-center justify-center max-sm:pl-32">
      <div className="w-[25rem] h-[32rem] bg-[white] shadow-lg flex flex-col justify-around items-center m-auto rounded-[10px] gap-8">
        <h1 className="text-2xl text-primary font-semibold mt-[2rem]">
          NAIJA 01
        </h1>
        <form className=" w-80 h-20 flex flex-col justify-between gap-8 mb-[4rem] ">
          <div>
            <input
              className="h-12 mt-1 px-3 py-2 bg-white border-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none placeholder:italic placeholder:text-base placeholder:text-[#565872]  focus:border-[#0c7c3f] focus:ring-[#0c7c3f] block w-80 rounded sm:text-sm focus:ring-1 max-sm:w-60 max-sm:ml-10"
              name="password"
              type="text"
              placeholder="New password"
              {...formik.getFieldProps("newPassword")}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="text-xs text-[red] max-sm:ml-10">
                {formik.errors.newPassword}
              </div>
            ) : null}
          </div>
          <div>
            <input
              className="h-12 mt-1 px-3 py-2 bg-white border-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none placeholder:italic placeholder:text-base placeholder:font-sans placeholder:text-[#565872] block w-80 rounded sm:text-sm focus:ring-[#0c7c3f] focus:border-[#0c7c3f] max-sm:w-60 max-sm:ml-10"
              name="password"
              type="text"
              placeholder="Confirm new password"
              {...formik.getFieldProps("confirmNewPassword")}
            />
            {formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword ? (
              <div className="text-xs text-[red] max-sm:ml-10">
                {formik.errors.confirmNewPassword}
              </div>
            ) : null}
          </div>
        </form>
        <div>
          <button
            type="Submit"
            onClick={formik.handleSubmit}
            className="bg-[#0c7c3f] mb-[3rem] text-[white] h-12 w-[20rem] text-xl font-semibold rounded cursor-pointer hover:bg-[#38454F] max-sm:w-60"
          >
            Reset password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
