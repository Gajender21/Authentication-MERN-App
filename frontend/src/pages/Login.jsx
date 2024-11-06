import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../utils";
function Login() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  function handleChange(e) {
    const { name, value } = e.target;
    const tempInfo = { ...loginInfo };
    tempInfo[name] = value;
    setLoginInfo(tempInfo);
  }
  async function submitHandler(e) {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      handleError("Invalid input!");
    }

    try {
      const url = "http://localhost:8080/auth/login";
      const repsonse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await repsonse.json();
      console.log(result);
      const { message, name, success, jwtToken, error } = result;
      if (error) {
        handleError(error.details[0].message);
      }
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className="container">
      <div className="heading">Login</div>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={loginInfo.email}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={loginInfo.password}
            placeholder="Enter your password"
          />
        </div>
        <div className="buttonLink">
          <button type="submit" onClick={submitHandler}>
            Login
          </button>
          <div>
            Don't have an account? <Link to="/signup">Signup</Link>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
