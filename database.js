const { Client } = require('pg');

// Connection configuration
const connectionConfig = {
  user: 'postgres', // Assuming the default username is 'postgres'
  host: 'localhost',
  database: 'postgres', // Replace 'your_database_name' with your actual database name
  password: 'gun',
  port: 5432
};

// Create a new client instance
const client = new Client(connectionConfig);

// Connect to the PostgreSQL server
client.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL server');
    // You can perform database operations here
    // For example, you can execute queries using client.query()
  })
  .catch(err => console.error('Error connecting to PostgreSQL server', err))
  .finally(() => {
    // Make sure to release the client when done
    // This closes the connection and releases the client back to the pool
    client.end();
  });

  module.exports = client;
