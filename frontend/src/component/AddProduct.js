import React, { useState } from "react";
import "../App.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });
  const [errors, setErrors] = useState("");
  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const addProduct = async (e) => {
    e.preventDefault();
    if (
      !product.name ||
      !product.category ||
      !product.company ||
      !product.price
    ) {
      setErrors("Please fill all fields");
      return false;
    }
    let userId = await JSON.parse(localStorage.getItem("users"))._id;
    let result = await fetch(`http://localhost:5000/ak/products/addproduct`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: product.name,
        company: product.company,
        category: product.category,
        price: product.price,
        userId,
      }),
    });
    result = await result.json();
    console.log(result);
  };
  return (
    <div className="container">
      <h1 className="text-center my-5">Add Product</h1>
      <form style={{ marginLeft: 380 }}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            style={{ width: 400 }}
            placeholder="Name"
            value={product.name}
            onChange={onChange}
            name="name"
          />
          {errors && !product.name && (
            <span className="errors-input"> Enter name </span>
          )}
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            style={{ width: 400 }}
            className="form-control"
            placeholder="Price"
            value={product.price}
            onChange={onChange}
            name="price"
          />
          {errors && !product.price && (
            <span className="errors-input"> Enter price </span>
          )}
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            style={{ width: 400 }}
            className="form-control"
            placeholder="Category"
            value={product.category}
            onChange={onChange}
            name="category"
          />
          {errors && !product.category && (
            <span className="errors-input"> Enter category </span>
          )}
        </div>
        <div className="form-group">
          <label>Company</label>
          <input
            type="text"
            style={{ width: 400 }}
            className="form-control"
            placeholder="Company"
            value={product.company}
            onChange={onChange}
            name="company"
          />
          {errors && !product.company && (
            <span className="errors-input"> Enter company </span>
          )}
        </div>
        <button type="submit" onClick={addProduct} className="btn btn-dark">
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
