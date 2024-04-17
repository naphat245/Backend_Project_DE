const express = require("express");
const dbConnection = require("../database");

//post Node
const createNode = async (req, res) => {
  try {
    const { name, detail, owner } = req.body;
    const newNode = [name, detail, owner];

    await dbConnection.query(
      "INSERT INTO node ( name, detail, owner) VALUES (?, ?, ?)",
      newDrink
    );
    res.status(200).json({ message: "successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};

//update Node
const updateNode = async (req, res) => {
  try {
    const { name, detail, owner } = req.body;
    const newNode = [name, detail, owner, req.params.id];

    await dbConnection.query(
      //"UPDATE drinks SET drinks_types = ? , name = ? , price = ? WHERE id = ?",
      newNode
    );
    res.status(200).json({ message: "successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};

//delete Node
const deleteNode = async (req, res) => {
  try {
    const newNode = [req.params.id];

    await dbConnection.query("DELETE FROM node WHERE id=?", newNode);
    res.status(200).json({ message: "successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};

//get Node
const getNode = async (req, res) => {
  try {
    const getNode = await dbConnection.query("SELECT * FROM node");
    res.send(getNode[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};

// get by Type_Node
const getDrinkByType = async (req, res) => {
    try {
      const getNode = await dbConnection.query(
        "SELECT name, detail, owner FROM node WHERE node = (SELECT name FROM node WHERE name = ?)",
        [req.params.name]
      );
  
      console.log('getNode:', getNode); // Log the results for debugging
  
      if (getNode[0].length === 0) {
        res.status(404).json({ message: "Node not found" });
      } else {
        res.send(getNode[0]);
      }
    } catch (error) {
      console.error('Error in getNodeByName:', error); // Log the error for debugging
      res.status(500).json({ message: "Internal Server Error" });
    }
};



//get by ID_Node
const getByIdNode = async (req, res) => {
  try {
    const getNode = await dbConnection.query(
      "SELECT * FROM Node WHERE id=?",
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
  getNodeByName,
};
