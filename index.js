const express = require('express');
const app = express();
const api = require("./routes");
require('dotenv').config();
const port = process.env.NODE_ENV_PORT || 3000;
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);

app.listen(port, (err) => {
  if(err){
    throw new Error('Something bad happened');
  }
  console.log(`Server listening on port ${port}`);
});