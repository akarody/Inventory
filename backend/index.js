const express = require('express');
const { Pool } = require('pg');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');
const { type } = require('os');
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
// Route to handle importing CSV data

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


const upload = multer({ dest: 'uploads/' });

// Endpoint to upload and process CSV file
app.post('/upload-csv', upload.single('csvFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const csvFilePath = req.file.path;
        const rowsInserted = await processCSV(csvFilePath);
        fs.unlink(csvFilePath, (err) => {
            if (err) {
                console.error('Error deleting CSV file:', err);
            } else {
                console.log('CSV file deleted successfully');
            }
        });
        res.status(200).send(`${rowsInserted} rows inserted successfully.`);
    } catch (error) {
        console.error('Error processing CSV:', error);
        res.status(500).send('Internal Server Error');
    }
});

async function processCSV(csvFilePath) {
    let rowsInserted = 0;
    const inputStream = fs.createReadStream(csvFilePath);

    await new Promise((resolve, reject) => {
        inputStream
            .pipe(csv())
            .on('data', async (row) => {
                try {
                    console.log(row)
                    // Insert the row data into the cars table
                    const query = `INSERT INTO cars (part_number, alt_part_number, name, brand, model, engine, location_a, location_a_stock, location_b, location_b_stock, unit, rate, value, remarks) 
                                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`;
                    const values = [
                        row['Part#'],
                        row['Alt.Part#'],
                        row['Name'],
                        row['Brand'],
                        row['Model'],
                        row['Engine'],
                        row['location A'],
                        parseInt(row['LOCATION A STOCK']),
                        row['LOCATION B'],
                        parseInt(row['LOC B STOCK ']),
                        row['Unit'],
                        parseInt(row['Rate']),
                        parseInt(row['Value']),
                        row['Remarks']
                    ];



                    await pool.query(query, values);
                    rowsInserted++;
                } catch (error) {
                    console.error('Error inserting row:', error);
                }
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
                resolve();
            })
            .on('error', (error) => {
                reject(error);
            });
    });

    return rowsInserted;
}
// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});