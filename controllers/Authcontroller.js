const dbConnection = require("../database");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { username, email, password, node, role } = req.body;

  try {
    if (!username || !email || !password || !node || !role) {
      return res.status(400).json({
        message: "Cannot register with empty fields",
        register: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      email,
      password: hashedPassword,
      node,
      role // Assign the role provided in the request
    };

    const query = "INSERT INTO users (username, email, password, node, role) VALUES (?, ?, ?, ?, ?)";
    const values = [newUser.username, newUser.email, newUser.password, newUser.node, newUser.role];

    await dbConnection.query(query, values);

    res.status(200).json({ message: "Registration successful", register: true });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed", register: false });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await dbConnection.query("SELECT * FROM users WHERE email = ?", [email]);

    if (users[0]) {
      const user = users[0];

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Check the user's role and respond accordingly
        if (user.role === 'main-admin') {
          res.status(200).json({ message: "Main admin login successful", user, status_code: "Main Admin" });
        } else if (user.role === 'child-admin') {
          res.status(200).json({ message: "Child admin login successful", user, status_code: "Child Admin" });
        } else {
          res.status(401).json({ message: "Invalid role", login: false });
        }
      } else {
        res.status(401).json({ message: "Invalid password", login: false });
      }
    } else {
      res.status(404).json({ message: "User not found", login: false });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", login: false });
  }
};

const users = async (req, res) => {
  try {
    const [users] = await dbConnection.query("SELECT * FROM users");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error" });
  }
};

const subAdmins = async (req, res) => {
  try {
    // Fetch sub-admins from the database
    const [subAdmins] = await dbConnection.query("SELECT * FROM users WHERE role = 'child-admin'");
    res.status(200).json(subAdmins);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error" });
  }
};

const getUserDropdown = async (req, res) => {
  try {
    const users = await dbConnection.query("SELECT * FROM user");
    res.render("index", { users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { register, users, login, subAdmins, getUserDropdown };
