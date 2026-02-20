import dotenv from "dotenv";
import express from "express";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => {
  res.send(`Hello from root on port ${PORT}`);
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
