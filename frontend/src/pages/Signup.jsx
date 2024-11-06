import { useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
function Signup() {
  const navigate = useNavigate();
  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    const tempInfo = { ...signUpInfo };
    tempInfo[name] = value;
    setSignUpInfo(tempInfo);
  }
  async function submitHandler(e) {
    e.preventDefault();
    const { name, email, password } = signUpInfo;
    if (!name || !email || !password) {
      handleError("Invalid input!");
    }

    try {
      const url = "http://localhost:8080/auth/signup";
      const repsonse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpInfo),
      });
      const result = await repsonse.json();
      console.log(result);
      const { message, success, error } = result;
      if (error) {
        handleError(error.details[0].message);
      }
      if (success) {
        handleSuccess(message); 
      } else {
        handleError(message);
      }
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className="container">
      <div className="heading">Signup</div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            value={signUpInfo.name}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={signUpInfo.email}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={signUpInfo.password}
            placeholder="Enter your password"
          />
        </div>
        <div className="buttonLink">
          <button type="submit">Signup</button>
          <div>
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
