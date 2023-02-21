"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../../../components/form/FormInput";
import FormTextArea from "../../../components/form/FormTextArea";
import FormInputFile from "../../../components/form/FormInputFile";
import { uploadImages } from "./../../../utils/firebase.config";

const Home = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      // images: [],
      name: "",
      description: "",
      price: "",
      stockCount: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Must be less than 50 characters")
        .required("Name is required"),
      description: Yup.string()
        .max(500, "Must be less than 500 characters")
        .required("Description is required"),
      price: Yup.number()
        .positive("Price must be a positive number")
        .required("Price is required"),
      stockCount: Yup.number()
        .positive("Stock count must be a positive number")
        .integer("Stock count must be a whole number")
        .required("Stock count is required"),
    }),
    onSubmit: async (
      { name, description, price, stockCount },
      { resetForm }
    ) => {
      const body = { name, description, price, stockCount };
      try {
        const response = await fetch("/api/product", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (response.status !== 200) {
          console.log("Something went wrong");
        } else {
          resetForm();
          console.log("form submitted successfully!!!");
        }
      } catch (error) {
        console.log("There was an error submitting", error);
      }
    },
  });

  return (
    <div className="w-11/12 md:w-3/5 xl:w-2/5 m-auto mt-8">
      <h1 className="font-bold text-3xl text-gray-800 ml-8 mb-4">
        Upload product
      </h1>
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col mx-8 my-8">
          {/* <FormInputFile formik={formik} /> */}
          <FormInput formik={formik} label="Name" field="name" type="text" />
          <FormTextArea formik={formik} />
          <FormInput
            formik={formik}
            type="number"
            label="Price"
            field="price"
          />
          <FormInput
            formik={formik}
            type="number"
            label="Stock count"
            field="stockCount"
          />
          <button
            type="submit"
            disabled={loading}
            className={`shadow rounded w-full px-2 py-2 ${
              success === true
                ? "bg-green-600 text-green-50"
                : "bg-blue-600 text-blue-50"
            }  hover:bg-blue-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? "Uploading..." : success ? "Uploaded" : "Upload"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
