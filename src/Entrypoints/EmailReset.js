import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function EmailReset() {
  const [statusMessages, setStatusMessages] = useState("");
  const base_url =
    process.env.REACT_APP_NODE_ENV === "development"
      ? process.env.REACT_APP_LOCAL_BASE_URL
      : process.env.REACT_APP_SERVER_BASE_URL;

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    // onSubmit: (values) => {
    //   console.log(values);

    //   axios
    //     .post(`${base_url}/resetEmail`, values)
    //     .then((res) => {
    //       formik.resetForm();
    //       alert("Reset password link sent to your email");
    //     })
    //     .catch((err) => alert("Some error occurred"));
    // },

    onSubmit: async (values) => {
      console.log(values);

      try {
        const response = await axios.post(`${base_url}/resetEmail`, values);
        const responseData = response.data;

        if (response.status === 200) {
          formik.resetForm();
          setStatusMessages(responseData.message);
        } else if (response.status === 404) {
          setStatusMessages(responseData.message);
        } else if (response.status === 500) {
          setStatusMessages(responseData.message);
        }
      } catch (error) {
        console.error("Error:", error);
        setStatusMessages("An error occurred while processing your request.");
      }
    },
  });

  return (
    <div className="w-[25rem] h-[26rem] bg-[white] shadow-2xl flex flex-col justify-around items-center absolute py-5 rounded-[10px] backdrop-blur-3xl backdrop-brightness-150 max-sm:w-[20rem]">
      <h1 className="text-2xl text-primary font-semibold font-asset">
        NAIJA 01
      </h1>
      <div className="flex flex-col justify-between gap-8 items-center">
        <p className="text-xl text-[#565872]">Enter your registered email</p>
        <form
          onSubmit={formik.handleSubmit}
          className=" w-80 h-20 flex flex-col justify-between gap-8"
        >
          <div>
            <input
              className="h-12 px-3 py-2 bg-white border-2 border-[#0c7c3f] shadow-sm placeholder-slate-400 focus:outline-none placeholder:italic placeholder:text-base placeholder:text-[#565872]  focus:border-[#0c7c3f] focus:ring-[#0c7c3f] block w-80 rounded sm:text-sm focus:ring-1 max-sm:w-60 max-sm:ml-10"
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
        </form>
      </div>
      <div className="pb-8">
        {statusMessages && (
          <p className="text-center text-xs text-[red] mb-5">
            {statusMessages}
          </p>
        )}
        <button
          type="Submit"
          onClick={formik.handleSubmit}
          className="bg-[#0c7c3f] text-[white] h-12 w-[20rem] text-md font-medium rounded font-asset cursor-pointer hover:bg-[#38454F] max-sm:w-60"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default EmailReset;
