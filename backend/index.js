const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// PostgreSQL configuration
const pool = new Pool({
    user: 'postgres_write',
    host: 'localhost',
    database: 'postgres_db',
    password: 'your_password',
    port: 5432,
});

// Middleware to parse JSON bodies
app.use(express.json());


pool.query(`
    INSERT INTO uploaded_images (id, image_url, width, height, metadata)
    VALUES ('4', 'https://example.com/image1.jpg', 800, 600, '{"description": "Image 1"}'),
           ('5', 'https://example.com/image2.jpg', 1024, 768, '{"description": "Image 2"}'),
           ('6', 'https://example.com/image3.jpg', 1280, 720, '{"description": "Image 3"}')
`)
    .then(() => {
        console.log('Data inserted successfully');
    })
    .catch(err => {
        console.error('Error inserting data:', err);
    });
// Route to handle importing CSV data

app.get('/cars', (req, res) => {
    res.json(cars);
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


app.post('/import', async (req, res) => {
    try {
        // Parse CSV data from request body
        const csvData = req.body.csvData;

        // Example SQL query to insert data into PostgreSQL
        const query = 'INSERT INTO your_table_name (column1, column2, ...) VALUES ($1, $2, ...)';
        await pool.query(query, csvData);

        res.send('CSV data imported successfully');
    } catch (error) {
        console.error('Error importing CSV data:', error);
        res.status(500).send('Internal server error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});