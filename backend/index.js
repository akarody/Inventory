const express = require('express');
const { Pool } = require('pg');
const multer = require('multer');

const app = express();
const port = 5000;

const update = require("./routes/update");
const csvRoute = require("./routes/csvRoute")
const { pool } = require('./dbConnect');

// PostgreSQL configuration




// Middleware to parse JSON bodies
app.use(express.json());
app.use("/update", update)
app.use("/csv", csvRoute);


// pool.query(`
// INSERT INTO cars (part_number, alt_part_number, name, brand, model, engine, location_a, location_a_stock, location_b, location_b_stock, unit, rate, value, remarks)
// VALUES 
// ('12345', '67890', 'Car Name 1', 'Brand Name 1', 'Car Model 1', 'Car Engine 1', 'Location A', 10, 'Location B', 20, 'Piece', 50, 500, 'Some remarks 1'),
// ('54321', '09876', 'Car Name 2', 'Brand Name 2', 'Car Model 2', 'Car Engine 2', 'Location C', 15, 'Location D', 25, 'Piece', 60, 900, 'Some remarks 2')
// `)
//     .then(() => {
//         console.log('Data inserted successfully');
//     })
//     .catch(err => {
//         console.error('Error inserting data:', err);
//     });


//view all data
app.get('/cars', async (req, res) => {
    try {
        const query = "SELECT * FROM cars;";
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/test', async (req, res) => {
    try {
        const query = "SELECT datname FROM pg_catalog.pg_database WHERE datistemplate = false;";
        const result = await pool.query(query);
        console.log(result.rows);
        res.status(200).send("Query executed successfully.");
    } catch (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Internal Server Error");
    }
});








// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);


});

