import React, { } from "react";
import * as Yup from "yup";

import { Formik, Form, Field,ErrorMessage } from "formik";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Curd.css";


const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Product name is required"),
  productPrice: Yup.number("Price must be a number").required("Price is required"),
  productCount: Yup.number(),
  productCategory: Yup.string().required("Barcode is required"),
  productDiscription: Yup.string().required("Category is required"),
 
});

const initialValues = {
  productName: '',
  productPrice: '',
  productCount: '',
  productCategory: '',
  productDescription: '',
};

const ProductForm = () => {
  
  

  const handleSubmit = (values) => {
    // Handle form submission here
    console.log(values);
  };

  return (
    <section className="product mt-4 mb-4 mt-5">
      <div className="container">
        <h2>Create Product</h2>
        <hr />

        <Formik initialValues={initialValues} 
         validationSchema={validationSchema}
        onSubmit={handleSubmit}>
          {({ isSubmitting, values }) => (
            <Form>
            <Field id="" type="text" name="name" className="form-control" />
              <div className="error">
                <ErrorMessage name="name" style={{ color: "#ff0000" }} />
              </div>

              {/* Rest of the form fields */}

              <button
                id="addProducts"
                className="btn btn-info mt-2"
                type="submit"
              >
                Add Product
              </button>
              {/* Cancel and delete buttons */}
            </Form>
          )}
        </Formik>

        {/* Rest of the component */}
      </div>
    </section>
  );
};

export default ProductForm;
