import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("users");
    if (auth) {
      navigate("/");
    }
  });
  const [credential, setCredentail] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setCredentail({ ...credential, [e.target.name]: e.target.value });
  };
  const collectData = async (e) => {
    e.preventDefault();
    // console.warn(credential.email, credential.password);
    let result = await fetch(`http://localhost:5000/ak/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    result = await result.json();
    console.warn(result);
    if (result.token) {
      // localStorage.setItem("users", JSON.stringify(result));
      localStorage.setItem("users", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.token));
      navigate("/");
    }
  };
  return (
    <div className="py-5">
      <div className="container p-5 h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="box_color card rounded my-5">
              <div className="card-body">
                <form>
                  <p className="h3 text-center mb-4 text-dark">Login</p>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      value={credential.email}
                      onChange={onChange}
                      name="email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={credential.password}
                      onChange={onChange}
                      name="password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-dark btn-block"
                    onClick={collectData}
                  >
                    Login
                  </button>
                  <p className="text-center mt-3">
                    Don't have an account
                    <Link to="/signup">
                      <b> Sign Up</b>
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
export default Login;
