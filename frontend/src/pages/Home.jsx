import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
function Home() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setCurrentUser(localStorage.getItem("loggedInUser"));
  });

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logout Successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }
  async function getProducts() {
    const url = "http://localhost:8080/products";
    const headers = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await fetch(url, headers);
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      handleError(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <h1>{currentUser}</h1>
      <div>
        {products?.map((item, index) => {
          return (
            <div key={index}>
              {item.name} {item.price}{" "}
            </div>
          );
        })}
      </div>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer />
    </div>
  );
}

export default Home;
