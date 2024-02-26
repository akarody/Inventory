// controllers/inventoryController.js

const updateInventory = async (req, res) => {
    try {
        // Extract data from request body
        const { part_number, locA_stock, locB_stock } = req.body;

        // Construct the UPDATE query based on the provided stock values
        let query;
        let values;
        if (locA_stock !== undefined && locB_stock !== undefined) {
            // Update both loc_A and loc_B stock
            query = `
          UPDATE inventory
          SET locA_stock = $1, locB_stock = $2
          WHERE part_number = $3
        `;
            values = [locA_stock, locB_stock, part_number];
        } else if (locA_stock !== undefined) {
            // Update only loc_A stock
            query = `
          UPDATE inventory
          SET locA_stock = $1
          WHERE part_number = $2
        `;
            values = [locA_stock, part_number];
        } else if (locB_stock !== undefined) {
            // Update only loc_B stock
            query = `
          UPDATE inventory
          SET locB_stock = $1
          WHERE part_number = $2
        `;
            values = [locB_stock, part_number];
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
