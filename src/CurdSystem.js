import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Curd.css";

function CrudSystem() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
 
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCount, setProductCount] = useState("");
  const [productTotal, setProductTotal] = useState("");

  useEffect(() => {
    // Load data from localStorage on component mount
    const storedProducts = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(storedProducts);
    
  }, []);


  useEffect(() => {
    // Update localStorage whenever products state changes
    localStorage.setItem("product", JSON.stringify(products));
  }, [products]);

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
    // document.getElementById("productsTotal").value = result
  };
  const product = {
    name: productName.toLowerCase(),
    price: productPrice,
    category: productCategory.toLowerCase(),
    description: productDescription,
    count: productCount,
  };

  const addProduct = () => {
    
    setProducts([...products, product]);
    getTotal();
    
    // clearData();
  };

  const deleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
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
            />
            <input
              onChange={(e) => {
                setProductCount(e.target.value);
              }}
              type="number"
              className="form-control mb-4 w-25"
              id="productCount"
              placeholder="Product Count"
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
          />

          <input
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
            type="text"
            className="form-control mb-4"
            id="productDescription"
            placeholder="Product Description"
          />

          <button
            id="addProducts"
            // onclick="addProduct()"
            className="btn btn-info mt-2"
            onClick={addProduct}
          >
            Add Product
          </button>
          <button
            id="btnDeleteAll"
            className="btn btn-danger mt-2"
            // onClick={deleteProduct}

            
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
              placeholder="Search Prodduct...."
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
              {products.map((obj, index) => (
                <tr key={index}>
                  <td className="mt-1">{obj.index}</td>
                  <td>{obj.name}</td>
                  <td>{obj.price}</td>
                  <td>{obj.category}</td>
                  <td>{obj.description}</td>
                  <td><button onClick="deleteRow(${i})" class="btn btn-danger">Delete</button></td>
                  <td><button onclick="editRow(${i})" class="btn btn-warning">Edit</button></td>
                  <td>
                  {obj.count}
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