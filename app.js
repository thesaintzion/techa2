const express = require('express');
const app = express();
// const router = express.Router();
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
// const config = require('./config/db');
// const authentication = require('./routes/authentication')(router);

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);
// mongoose.connect(config.uri, function(err) {
//     if (err) {
//         console.log(`could not connect ${err}`);
//     } else {
//         console.log('MongoDb Is Connected');
//     }
// });

// routes
const theView = path.join('./public');
app.use(express.static(theView));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`App running om port ${PORT}`);
})