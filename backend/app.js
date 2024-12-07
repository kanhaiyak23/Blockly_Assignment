const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const locations = require("./data.json");

let index = 0;

app.get("/api/vehicle-location", (req, res) => {
  const data = locations.slice(0, index + 1); // Return locations up to the current point
  res.json(data);
  index = (index + 1) % locations.length; // Loop through locations
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
