import React from "react";

const Table = () => {
  return (
    <div>
      <div className="searchBy">
        <select
          className="form-select w-50 mx-auto"
          aria-label="Default select example"
          id="selectSearch"
        >
          <option selected>Choose Search By?</option>
          <option id="searchTitle" value="1">
            Search By Title
          </option>
          <option id="searchCategory" value="2">
            Search By Category
          </option>
        </select>

        <input
          type="text"
          className="w-50 form-control mx-auto"
          id="search"
          placeholder="Search Product...."
        />
      </div>

      <div className="table-responsive">
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
          <tbody id="tBody"></tbody>
          <tfoot id="tFoot"></tfoot>
        </table>
      </div>
    </div>
  );
};

export default Table;
