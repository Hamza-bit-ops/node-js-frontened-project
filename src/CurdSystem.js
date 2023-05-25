import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, InputGroup } from "react-bootstrap";
import "./Curd.css";
import axios from "axios";
const apiUrl = "http://localhost:3001"; // Update with your server's URL

function CrudSystem() {
  const [search, setSearch] = useState("");
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
    getData();
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
    getData();
  };
  useEffect(() => {
    getData();

    // Load data from localStorage on component mount
    // const storedProducts = JSON.parse(localStorage.getItem("product"));
    // setProducts(storedProducts || []);
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
    // localStorage.setItem("product", JSON.stringify([...products, newProduct]));
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

  return (
    <>
      <header className="header mb-5">
        <div className="container">
          <div className="titleProject">
            <h1>CRUDS SYSTEM</h1>
          </div>
        </div>
      </header>

      <section className="product mt-4 mb-4 mt-5">
        <div className="container">
          <h2>Create Product</h2>
          <hr />
          <input
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            type="text"
            className="form-control mb-4"
            id="productName"
            placeholder="Product Name"
            value={productName}
          />
          <div className="priceCount">
            <input
              onChange={(e) => {
                setProductPrice(e.target.value);
              }}
              type="number"
              className="form-control mb-4 w-25"
              id="productPrice"
              placeholder="Product Price"
              value={productPrice}
            />
            <input
              onChange={(e) => {
                setProductCount(e.target.value);
              }}
              type="number"
              className="form-control mb-4 w-25"
              id="productCount"
              placeholder="Product Count"
              value={productCount}
            />
            <button
              id="label"
              className="btn btn-danger mt-2"
              onClick={getTotal}
            >
              Total
            </button>
            <input
              type="text"
              className="form-control mb-4 w-25"
              id="productsTotal"
              placeholder="Total Product"
              onChange={(e) => setProductTotal(e.target.value)}
              value={productTotal || ""}
            />
          </div>

          <input
            onChange={(e) => {
              setProductCategory(e.target.value);
            }}
            type="text"
            className="form-control mb-4"
            id="productCategory"
            placeholder="Product Category"
            value={productCategory}
          />

          <input
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
            type="text"
            className="form-control mb-4"
            id="productDescription"
            placeholder="Product Description"
            value={productDescription}
          />

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

          <Form>
            <InputGroup className="my-3">
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search contacts"
              />
            </InputGroup>
          </Form>

          <div className="searchBy">
            <select
              className="form-select w-50 mx-auto"
              aria-label="Default select example"
              id="selectSearch"
            >
              <option value>Choose Search By?</option>
              <option id="searchName" value="1">
                Search By Title
              </option>
              <option id="searchCategory" value="2">
                Search By Category
              </option>
            </select>

            <input
            //  onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="w-50 form-control mx-auto"
              id="search"
              placeholder="Search Product...."
            />
          </div>

          

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
              {myProducts
                .filter((item) => {
                  
                  return search === ""
                  
                    ? item
                    : item.name.toLowerCase().includes(search);
                    console.log('===========>',item)
                })
               
                .map((product, index) => (
                  
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

export default CrudSystem;
