import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("CSRadrX API running..... ");
});

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});