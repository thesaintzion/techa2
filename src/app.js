import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Path from 'app-root-path';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import uri from './config/db';

const app = express();

mongoose.connect(uri)
    .then(() => console.log('Now connected to the DB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(cors());

// Normal express config defaults
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride());


// // routes
// const theView = path.join('./public');
// app.use(express.static(theView));
// app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname + '/public/index.html'));
// });

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => res.status(200).json({
    status: 200,
    message: 'Welcome'
}));
app.use((req, res) => {
    res.status(404).json({
      status: 404,
      error: 'Wrong request. Route does not exist',
    });
});  

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})
