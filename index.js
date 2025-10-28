const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Server");
});

app.listen(PORT, () => {
  console.log(`Your server running on port http://localhost:${PORT}`);
});
