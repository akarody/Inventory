const { pool } = require("../dbConnect")

const updateInventory = async (req, res) => {
    try {
        // Extract data from request body
        const { part_number, location_a_stock, location_b_stock } = req.body;

        // Construct the UPDATE query based on the provided stock values
        let query;
        let values;
        if (location_a_stock !== undefined && location_b_stock !== undefined) {
            // Update both loc_A and loc_B stock
            query = `
          UPDATE cars
          SET location_a_stock = $1, location_b_stock = $2
          WHERE part_number = $3
        `;
            values = [location_a_stock, location_b_stock, part_number];
        } else if (location_a_stock !== undefined) {
            // Update only loc_A stock
            query = `
          UPDATE cars
          SET location_a_stock = $1
          WHERE part_number = $2
        `;
            values = [location_a_stock, part_number];
        } else if (location_b_stock !== undefined) {
            // Update only loc_B stock
            query = `
          UPDATE cars
          SET location_b_stock = $1
          WHERE part_number = $2
        `;
            values = [location_b_stock, part_number];
        } else {
            return res.status(400).json({ message: 'No stock values provided' });
        }

        // Execute the UPDATE query
        const result = await pool.query(query, values);

        // Check if any rows were updated
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        // Send success response
        res.status(200).json({ message: 'Inventory updated successfully' });
    } catch (error) {
        console.error('Error updating inventory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { updateInventory };
