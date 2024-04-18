const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const dbConnection = require("../database");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to fetch dashboard data
app.get("/dashboard", async (req, res) => {
  try {
    // Fetch dashboard data from the database
    const dashboardData = await dbConnection.query("SELECT * FROM dashboard");
    res.json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
});

// Route to fetch graph data by ID
app.get("/dashboard/graph/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // Fetch graph data from the database based on ID
    const graphData = await dbConnection.query("SELECT * FROM graphs WHERE id = ?", [id]);
    if (graphData.length === 0) {
      return res.status(404).json({ message: "Graph not found" });
    }
    // Send the graph data as response
    res.json(graphData[0]);
  } catch (error) {
    console.error("Error fetching graph data:", error);
    res.status(500).json({ message: "Error fetching graph data" });
  }
});

// Route to download graph file by ID
app.get("/dashboard/graph/download/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // Fetch graph file path from the database based on ID
    const graphFilePath = await dbConnection.query("SELECT file_path FROM graphs WHERE id = ?", [id]);
    if (graphFilePath.length === 0) {
      return res.status(404).json({ message: "Graph not found" });
    }
    // Send the graph file as response
    res.download(graphFilePath[0].file_path);
  } catch (error) {
    console.error("Error downloading graph:", error);
    res.status(500).json({ message: "Error downloading graph" });
  }
});

// Route to download PCAP file by ID
app.get("/dashboard/pcap/download/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // Fetch PCAP file path from the database based on ID
    const pcapFilePath = await dbConnection.query("SELECT file_path FROM pcaps WHERE id = ?", [id]);
    if (pcapFilePath.length === 0) {
      return res.status(404).json({ message: "PCAP file not found" });
    }
    // Send the PCAP file as response
    res.download(pcapFilePath[0].file_path);
  } catch (error) {
    console.error("Error downloading PCAP file:", error);
    res.status(500).json({ message: "Error downloading PCAP file" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
