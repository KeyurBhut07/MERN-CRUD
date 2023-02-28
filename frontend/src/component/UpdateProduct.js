import React, { useEffect, useState } from "react";
import "../App.css";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(
      `http://localhost:5000/ak/products/product/${params.id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    setProduct(result);
  };

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    let result = await fetch(
      `http://localhost:5000/ak/products/updateproduct/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: product.name,
          company: product.company,
          category: product.category,
          price: product.price,
        }),
      }
    );
    result = await result.json();
    if (result) {
      alert("Product Updated");
      navigate("/");
    } else {
      alert("Product Not Updated");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-5">Update Product</h1>
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
        </div>
        <button type="submit" onClick={updateProduct} className="btn btn-dark">
          Update PRODUCT
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
