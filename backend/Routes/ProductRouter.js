import express from "express";
import isAuthenticated from "../Middlewares/Auth.js";
const router = express.Router();

router.get("/", isAuthenticated, (req, res) => {
  console.log("Logged in user details ", req.user);

  res.status(201).json([
    {
      name: "Macbook",
      price: 82000,
    },
    {
      name: "PC",
      price: 140000,
    },
  ]);
});

export default router;
