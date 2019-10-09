const express = require('express');
const app = express();
// const router = express.Router();
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const cors = require('cors');
const path = require('path');
// const mongoose = require('mongoose');
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

// Middleware
// app.use(morgan('short'));
// app.use(bodyParser.json());
// app.use(cors());

// routes
const theView = path.join('./public');
app.use(express.static(theView));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
// app.use('/authentication', authentication);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`App running om port ${PORT}`);
    // console.log(Date.now());
});


// "dependencies": {
//     "bcrypt": "^3.0.6",
//     "body-parser": "^1.19.0",
//     "cors": "^2.8.5",
//     "express": "^4.17.1",
//     "mongoose": "^5.7.3",
//     "morgan": "^1.9.1"
// }
// }