const { pool } = require("../dbConnect")

const viewCars = async (req, res) => {
    try {
        const query = "SELECT * FROM cars;";
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { viewCars }