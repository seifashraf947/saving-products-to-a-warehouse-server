const express = require("express");
const path = require("path");
const fs = require("fs");
const compression = require("compression");

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_FILE = path.join(__dirname, "data.json");
// The 'public' directory is where your HTML and client-side JS must be located.
const PUBLIC_DIR = path.join(__dirname, "public");

// Ensure the 'public' directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR);
  console.log(`Created directory: ${PUBLIC_DIR}`);
}

// Ensure the data file exists and is initialized
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, "[]");
  console.log(`Created data file: ${DATA_FILE}`);
}

// Store products in memory, loaded from file
let products = JSON.parse(fs.readFileSync(DATA_FILE, "utf8") || "[]");
console.log("Loaded saved products:", products.length);

// Middleware
app.use(express.json());
// Serves static files (index.html, app.js) from the 'public' folder
app.use(express.static(PUBLIC_DIR));
app.use(compression());
// Get all products API endpoint
app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

// Add new product API endpoint
app.post("/api/products", (req, res) => {
  const {name, quantity, description } = req.body;

  if (!name || !quantity) {
    return res.status(400).json({ error: "Name and Quantity are required." });
  }

  // Calculate next ID based on current products
  let nextId = 1;
  if (products.length > 0) {
    nextId = Math.max(...products.map((p) => p.id)) + 1;
  }

  const newProduct = {
    id: nextId,
    name,
    quantity: Number(quantity),
    description: description || "N/A",
    dateAdded: new Date().toLocaleString(),
  };

  // Save to memory and file
  products.push(newProduct);
  fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), (err) => {
    if (err) console.error("Failed to save data:", err);
  });

  console.log("Product added:", newProduct);
  res.status(201).json(newProduct);
});

// Fallback for any other requests (serves index.html)
app.get("/products", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
