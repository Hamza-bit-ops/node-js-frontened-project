import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Curd.css";
import axios from "axios";
import { Field, Formik, Form, ErrorMessage  } from "formik";
import * as Yup from "yup";
import Header from "./Header";
import Table from "./Table";
const apiUrl = "http://localhost:3001"; // Update with your server's URL

function FormikCrudSystem() {
  const [incrementCount, setIncrimentCount] = useState({});
  const [idForEditing, setIdForEditing] = useState("");
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCount, setProductCount] = useState("");
  const [productTotal, setProductTotal] = useState("");
  const [myProducts, setMyProducts] = useState([]);

  function getData() {
    axios.get(apiUrl).then((response) => {
      const myData = response.data;
      // console.log(myData);
      setMyProducts(myData);
    });
  }

  const getProductById = async (id) => {
    await axios.get(apiUrl + "/" + id).then((response) => {
      const editingId = response.data._id;
      // console.log("===========>",editingId);
      setIdForEditing(editingId);
      const myData = response.data;
      setProductName(myData.name);
      setProductPrice(myData.price);
      setProductCount(myData.count);
      setProductCategory(myData.category);
      setProductDescription(myData.description);
    });
  };

  const icrementCount = async (id) => {
    let count = 0;
    await axios.get(apiUrl + "/" + id).then((response) => {
      count = Number(response.data.count) + 1;
    });
    const newProduct = {
      count: Number(count),
    };
    const res = await axios.patch(`${apiUrl}/${id}/increment`, newProduct);
    getData()
  };
  const decrementCount = async (id) => {
    let count = 0;
    await axios.get(apiUrl + "/" + id).then((response) => {
      count = Number(response.data.count) - 1;
    });
    const newProduct = {
      count: Number(count),
    };
    const res = await axios.patch(`${apiUrl}/${id}/increment`, newProduct);
    getData()
  };
  useEffect(() => {
    getData();
  }, []);

  const getTotal = () => {
    let result = "";
    if (parseInt(productPrice) >= 0) {
      if (!productCount) {
        result = `${parseInt(productPrice) * 1}$`;
      } else {
        result = `${parseInt(productPrice) * productCount}$`;
      }
    }
    setProductTotal(result);
  };

  const addProduct = async () => {
    const newProduct = {
      name: productName.toLowerCase(),
      price: productPrice,
      category: productCategory.toLowerCase(),
      description: productDescription,
      count: productCount,
    };

    setProducts([...products, newProduct]);
    getTotal();
    clearData();
    console.log(apiUrl, newProduct);
    console.log(idForEditing);
    if (idForEditing) {
      try {
        const res = await axios.patch(`${apiUrl}/${idForEditing}`, newProduct);
        // console.log("==========>>", idForEditing);
        console.log("Item successfully edited.");
      } catch (error) {
        console.error(error);
      }
      return;
    }

    axios
      .post(apiUrl, newProduct)
      .then((response) => {
        console.log("Product added successfully:", response.product);
        // Update state and clear data
        setProducts([...products, newProduct]);

        getTotal();
        clearData();
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };

  const deleteProduct = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(apiUrl + "/" + id);
      getData();
      console.log("Item successfully deleted.");
    } catch (error) {
      alert(error);
    }
  };


  const clearData = () => {
    setProductName("");
    setProductPrice("");
    setProductCategory("");
    setProductDescription("");
    setProductCount("");
  };

  const initialValues = {
    productName: "",
    productPrice: "",
    productCount: "",
    productTotal: "",
    productCategory: "",
    productDescription: "",
  };
  const validationSchema = Yup.object().shape({
    productName: Yup.string().required("Name is required"),
    productPrice: Yup.string().required("Short name is required"),
    productCount: Yup.string(),
    productTotal: Yup.string(),
    productCategory: Yup.string(),
    productDescription: Yup.string(),
  });


  return (
    <>
     <Header />

      <section className="product mt-4 mb-4 mt-5">
        <div className="container">
          <h2>Create Product</h2>
          <Formik 
          initialValues={initialValues}
          validationSchema={validationSchema}
           >

            {({ resetForm, setValues }) => (
              <Form className="d-flex row p-2">
                <hr />
                <Field
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
                  type="text"
                  className="form-control mb-4"
                  id="productName"
                  name="productName"
                  placeholder="Product Name"
                  value={productName}
                />
                <div className="error">
                  <ErrorMessage name="productName" style={{ color: "#ff0000" }} />
                </div>
                <div className="priceCount">
                  <Field
                    onChange={(e) => {
                      setProductPrice(e.target.value);
                    }}
                    type="number"
                    className="form-control mb-4 w-25"
                    id="productPrice"
                    name="productPrice"
                    placeholder="Product Price"
                    value={productPrice}
                  />
                  <div className="error">
                    <ErrorMessage name="productPrice" style={{ color: "#ff0000" }} />
                  </div>
                  <Field
                    onChange={(e) => {
                      setProductCount(e.target.value);
                    }}
                    type="number"
                    className="form-control mb-4 w-25"
                    id="productCount"
                    name="productCount"
                    placeholder="Product Count"
                    value={productCount}
                  />
                  <div className="error">
                    <ErrorMessage name="productCount" style={{ color: "#ff0000" }} />
                  </div>
                  <button
                    id="label"
                    className="btn btn-danger mt-2"
                    onClick={getTotal}
                  >
                    Total
                  </button>
                  <Field
                    type="text"
                    className="form-control mb-4 w-25"
                    id="productsTotal"
                    name=""
                    placeholder="Total Product"
                    onChange={(e) => setProductTotal(e.target.value)}
                    value={productTotal|| ""}
                  />
                </div>
                <div className="error">
                  <ErrorMessage name="productsTotal" style={{ color: "#ff0000" }} />
                </div>

                <Field
                  onChange={(e) => {
                    setProductCategory(e.target.value);
                  }}
                  type="text"
                  className="form-control mb-4"
                  id="productCategory"
                  name="productCategory"
                  placeholder="Product Category"
                  value={productCategory}
                />
                 <div className="error">
                  <ErrorMessage name="productCategory" style={{ color: "#ff0000" }} />
                </div>

                <Field
                  onChange={(e) => {
                    setProductDescription(e.target.value);
                  }}
                  type="text"
                  className="form-control mb-4"
                  id="productDescription"
                  placeholder="Product Description"
                  value={productDescription}
                />
                 <div className="error">
                  <ErrorMessage name="productDescription" style={{ color: "#ff0000" }} />
                </div>

                <button
                  id="addProducts"
                  className="btn btn-info mt-2"
                  onClick={addProduct}
                >
                  {idForEditing ? "Edit Product" : "Add Product"}
                </button>
                <button
                  id="btnDeleteAll"
                  className="btn btn-danger mt-2"
                  onClick={() => setProducts([])}
                >
                  Delete All
                </button>
                <button className="btn btn-secondary mt-2">Cancel</button>

                <div className="searchBy">
                  <select
                    className="form-select w-50 mx-auto"
                    aria-label="Default select example"
                    id="selectSearch"
                  >
                    <option value>Choose Search By?</option>
                    <option id="searchTitle" value="1">
                      Search By Title
                    </option>
                    <option id="searchCategory" value="2">
                      Search By Category
                    </option>
                  </select>

                  <input
                    // onkeyup="searchProdduct(this.value)"
                    type="text"
                    className="w-50 form-control mx-auto"
                    id="search"
                    placeholder="Search Product...."
                  />
                </div>
              </Form>
            )}
          </Formik>
          <table className="table mt-5 mb-5 text-center table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Description</th>
                <th>Delete</th>
                <th>Edit</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {myProducts.map((product, index) => (
                <tr key={index}>
                  <td className="mt-1">{index}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      type="Button"
                      onClick={() => getProductById(product._id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="rounded-circle"
                      onClick={() => decrementCount(product._id)}
                    >
                      {" "}
                      -{" "}
                    </button>
                    {product.count}
                    <button
                      className="rounded-circle"
                      onClick={() => icrementCount(product._id)}
                    >
                      +
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot id="tFoot"></tfoot>
          </table>
        </div>
        <div>.</div>
      </section>
    </>
  );
}

export default FormikCrudSystem;
