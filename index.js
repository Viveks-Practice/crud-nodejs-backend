const express = require("express");
const cors = require("cors");

// Initialize the express app
const app = express();

// Use middlewares
app.use(cors());
app.use(express.json()); // For parsing application/json

// Define the port number
const PORT = process.env.PORT || 3001;

// In-memory data storage
let soilTypes = [
  { id: 1, name: "Loam", description: "Rich, well-drained soil" },
  {
    id: 2,
    name: "Clay",
    description: "Heavy, sticky soil that holds moisture well",
  },
  {
    id: 3,
    name: "Sandy",
    description: "Light, well-aerated soil that drains quickly",
  },
  {
    id: 4,
    name: "Silt",
    description: "Smooth, moisture-retentive soil with fine particles",
  },
  { id: 5, name: "Peat", description: "Dark, nutrient-rich, and acidic soil" },
  {
    id: 6,
    name: "Chalky",
    description:
      "Alkaline soil with large particles and poor moisture retention",
  },
];
let soilMovements = [
  {
    id: 1,
    type: "Loam",
    soilTypeId: 1,
    quantity: "10 tons",
    sourceLocation: "Farm A",
    destinationLocation: "Site X",
    date: "2023-01-15",
  },
  {
    id: 2,
    type: "Clay",
    soilTypeId: 2,
    quantity: "5 tons",
    sourceLocation: "Quarry B",
    destinationLocation: "Site Y",
    date: "2023-02-20",
  },
  {
    id: 3,
    type: "Sandy",
    soilTypeId: 3,
    quantity: "8 tons",
    sourceLocation: "Beach C",
    destinationLocation: "Garden Z",
    date: "2023-03-05",
  },
  // Add more predefined soil movements if necessary
];

// Simple route for GET request on '/'
app.get("/", (req, res) => {
  res.send("Welcome to the Soil Tracker API!");
});

// CRUD operations for soil types

// GET all soil types
app.get("/soil_types", (req, res) => {
  res.status(200).send(soilTypes);
});

// POST create a new soil type
app.post("/soil_types", (req, res) => {
  const { name, description } = req.body;
  const newSoilType = { id: soilTypes.length + 1, name, description };
  soilTypes.push(newSoilType);
  res.status(201).send(newSoilType);
});

// PUT update a soil type
app.put("/soil_types/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const soilType = soilTypes.find((st) => st.id === parseInt(id));
  if (!soilType) {
    return res.status(404).send("Soil type not found");
  }
  soilType.name = name;
  soilType.description = description;
  res.status(200).send(soilType);
});

// DELETE a soil type
app.delete("/soil_types/:id", (req, res) => {
  const { id } = req.params;
  soilTypes = soilTypes.filter((st) => st.id !== parseInt(id));
  res.status(204).send();
});

// CRUD operations for soil movements

// GET all soil movements
app.get("/soil_movements", (req, res) => {
  res.status(200).send(soilMovements);
});

// POST create a new soil movement
app.post("/soil_movements", (req, res) => {
  const {
    type,
    soilTypeId,
    quantity,
    sourceLocation,
    destinationLocation,
    date,
  } = req.body;

  // Check if the specified soilTypeId exists in the soilTypes array
  const soilTypeExists = soilTypes.some((st) => st.id === Number(soilTypeId));
  if (!soilTypeExists) {
    return res.status(404).send("Soil type does not exist");
  }

  // Create the new soil movement, assuming the soilTypeId is valid
  const newSoilMovement = {
    id: soilMovements.length + 1,
    type,
    soilTypeId,
    quantity,
    sourceLocation,
    destinationLocation,
    date,
  };
  soilMovements.push(newSoilMovement);
  res.status(201).send(newSoilMovement);
});

// PUT update a soil movement
app.put("/soil_movements/:id", (req, res) => {
  const { id } = req.params;
  const {
    type,
    soilTypeId,
    quantity,
    sourceLocation,
    destinationLocation,
    date,
  } = req.body;
  const soilMovement = soilMovements.find((sm) => sm.id === parseInt(id));

  if (!soilMovement) {
    return res.status(404).send("Soil movement not found");
  }

  // Optional: Check if the specified soilTypeId exists in the soilTypes array
  const soilTypeExists = soilTypes.some((st) => st.id === parseInt(soilTypeId));
  if (!soilTypeExists) {
    return res.status(404).send("Soil type does not exist");
  }

  soilMovement.type = type;
  soilMovement.soilTypeId = parseInt(soilTypeId);
  soilMovement.quantity = quantity;
  soilMovement.sourceLocation = sourceLocation;
  soilMovement.destinationLocation = destinationLocation;
  soilMovement.date = date;

  res.status(200).send(soilMovement);
});

// DELETE a soil movement
app.delete("/soil_movements/:id", (req, res) => {
  const { id } = req.params;
  soilMovements = soilMovements.filter((sm) => sm.id !== parseInt(id));
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
