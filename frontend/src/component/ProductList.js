import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    let result = await fetch(`http://localhost:5000/ak/products/allproducts`);
    result = await result.json();
    setProduct(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(
      `http://localhost:5000/ak/products/deleteproduct/${id}`,
      {
        method: "delete",
      }
    );
    result = await result.json();
    if (result) {
      getAllProduct();
    }
  };

  const onHandelSearch = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(
        `http://localhost:5000/ak/products/searchproduct/${key}`
      );
      result = await result.json();
      if (result) {
        setProduct(result);
      }
    } else {
      getAllProduct();
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-5">Product List</h1>
      {/* search box */}
      <div className="form-group my-5">
        <input
          type="text"
          className="form-control"
          placeholder="Search Product"
          onChange={onHandelSearch}
        />
      </div>
      {/* table */}
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Company</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {product.length > 0 ? (
            product.map((iteam, index) => (
              <tr key={iteam._id}>
                <td key={index}>{index + 1}</td>
                <td>{iteam.name}</td>
                <td>{iteam.price}</td>
                <td>{iteam.category}</td>
                <td>{iteam.company}</td>
                <td>
                  <Link to={`/update/${iteam._id}`}>
                    <button className="btn- btn-dark">Update</button>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn- btn-dark"
                    onClick={() => deleteProduct(iteam._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <h1>No Product Found</h1>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
