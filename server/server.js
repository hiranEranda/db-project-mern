// Dependencies
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const client = require("./routes/client");
const complaint = require("./routes/complaint");
const products = require("./routes/products");
const seller = require("./routes/seller");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use("/api/client", client);
app.use("/api/complaints", complaint);
app.use("/api/products", products);
app.use("/api/seller", seller);

// Env variable for port
const port = process.env.PORT || 5000;

// Listen on port
app.listen(port, () => console.log(`Server listening on port: ${port}`));

//data[0].complaint_date.toISOString().split("T")[0]
