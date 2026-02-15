import express from "express";

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from root');
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
