// index.js
const express = require('express');
const connection = require('./config/dbconfig');

const app = express();
app.use(express.json());




const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
