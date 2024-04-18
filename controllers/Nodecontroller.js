const express = require("express");
const dbConnection = require("../database");

// Middleware to check user role
const checkUserRole = (req, res, next) => {
  const { user } = req; // Assuming user information is available in the request object

  // Check if user is main admin or sub-admin
  if (user.role === 'main-admin' || user.role === 'sub-admin') {
    next(); // Allow access to the endpoint
  } else {
    res.status(403).json({ message: "Access forbidden" });
  }
};

// Create Node
const createNode = async (req, res) => {
  try {
    const { name, detail, owner } = req.body;
    // Assuming owner field stores the ID of the user who created the node
    const newNode = [name, detail, owner];

    // Perform access control logic here based on user's role
    // For example, check if the user is a main admin or sub-admin of the node's owner
    // If access is allowed, insert the new node into the database

    await dbConnection.query(
      "INSERT INTO node (name, detail, owner) VALUES (?, ?, ?)",
      newNode
    );
    res.status(200).json({ message: "Node created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};

// Update Node
const updateNode = async (req, res) => {
  try {
    const { name, detail, owner } = req.body;
    const newNode = [name, detail, owner, req.params.id];

    // Perform access control logic here based on user's role
    // Check if the user is a main admin or sub-admin of the node being updated
    // If access is allowed, update the node in the database

    await dbConnection.query(
      "UPDATE node SET name = ?, detail = ?, owner = ? WHERE id = ?",
      newNode
    );
    res.status(200).json({ message: "Node updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};

// Delete Node
const deleteNode = async (req, res) => {
  try {
    // Perform access control logic here based on user's role
    // Check if the user is a main admin or sub-admin of the node being deleted
    // If access is allowed, delete the node from the database

    await dbConnection.query("DELETE FROM node WHERE id=?", [req.params.id]);
    res.status(200).json({ message: "Node deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};

// Get Node
const getNode = async (req, res) => {
  try {
    // Perform access control logic here based on user's role
    // Retrieve nodes that the user has access to based on their role

    const getNode = await dbConnection.query("SELECT * FROM node");
    res.send(getNode[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};

// Get Node by ID
const getByIdNode = async (req, res) => {
  try {
    // Perform access control logic here based on user's role
    // Check if the user is a main admin or sub-admin of the node being fetched

    const getNode = await dbConnection.query(
      "SELECT * FROM node WHERE id=?",
      [req.params.id]
    );
    res.send(getNode[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = {
  createNode,
  getNode,
  deleteNode,
  updateNode,
  getByIdNode,
};
