import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("users");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = async (e) => {
    console.log(name, phone, email, password);
    e.preventDefault();
    let result = await fetch(`http://localhost:5000/ak/users/usercreate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, email, password }),
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("users", JSON.stringify(result.createuser));
    localStorage.setItem("token", JSON.stringify(result.token));
    if (result.token) {
      navigate("/");
    }
  };

  return (
    <div>
      <div className="container p-3 h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="box_color card rounded my-5">
              <div className="card-body">
                <form>
                  <p className="h3 text-center mb-4 text-dark">Sign Up</p>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone No</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="6353435399"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={collectData}
                    className="btn btn-dark btn-block"
                  >
                    Register
                  </button>
                  <p className="text-center mt-3">
                    If you have an account
                    <Link to="/login">
                      <b> Sign In</b>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
