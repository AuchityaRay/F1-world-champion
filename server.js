const express = require('express');;
const prouductRoutes = require('./rotues/productRoutes');
const dotenv = require('dotenv')

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', prouductRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})