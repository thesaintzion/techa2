const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const morgan = require('morgan');
// require('dotenv').config();
// const cors = require('cors');
// const mysql = require('mysql');
// const jwt = require('jsonwebtoken');
const path = require('path');


app.use(morgan('short'));

const theView = path.join('./public');

app.use(express.static(theView));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`App running om port ${PORT}`);
    // console.log(Date.now());
});