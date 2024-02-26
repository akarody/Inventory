const express = require('express');
const { Pool } = require('pg');
const multer = require('multer');

const app = express();
const port = 5000;

const update = require("./routes/update");
const csvRoute = require("./routes/csvRoute")
const view = require("./routes/view")
const { pool } = require('./dbConnect');


app.use(express.json());
app.use("/update", update)
app.use("/csv", csvRoute);
app.use("/view", view)

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);

});

