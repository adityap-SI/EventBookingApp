import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = (props) => {
  const emailRef = useRef("");
  const passRef = useRef("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post("/admincheck", {
        email: emailRef.current.value,
        password: passRef.current.value,
      });

      if (response.data === true) {
        props.func("dashboard");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light p-4 rounded">
          <h3 className="mb-4 text-center">Admin Login</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                className="form-control"
                placeholder="Your email address"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                ref={passRef}
                className="form-control"
                placeholder="Your password"
              />
            </div>

            <div className="mb-3 text-center">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={login}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
