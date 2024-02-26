const fs = require('fs');
const csv = require('csv-parser');
const { type } = require('os');
const { pool } = require("../dbConnect");

const uploadCSV = async (req, res) => {

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

}




//helper function to process CSV
async function processCSV(csvFilePath) {
    let rowsInserted = 0;
    const inputStream = fs.createReadStream(csvFilePath);

    await new Promise((resolve, reject) => {
        inputStream
            .pipe(csv())
            .on('data', async (row) => {
                try {
                    console.log(Object.keys(row)[7])
                    // Insert the row data into the cars table
                    const query = `INSERT INTO cars (part_number, alt_part_number, name, brand, model, engine, car_name, location_a, location_a_stock, location_b, location_b_stock, unit, rate, value, remarks) 
                                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`;
                    const values = [];
                    let count = 0;

                    for (const key in row) {
                        // Stop mapping values after reaching 14
                        if (count >= 15) break;
                        switch (key) {
                            case 'LOCATION A STOCK':
                            case 'LOC B STOCK ':
                            case 'Rate':
                            case 'Value':
                                values.push(parseInt(row[key]));
                                break;
                            default:
                                values.push(row[key]);
                                break;
                        }

                        count++;
                    }
                    console.log(values)



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


module.exports = { uploadCSV };