const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

// middleware de corpo da req
app.use(bodyParser.json());
app.use(morgan('tiny'))



require('dotenv/config')











const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
})