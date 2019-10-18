import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import uri from './config/db';
import userRoute from './routes/userRoute';

const app = express();

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

// Normal express config defaults
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1', userRoute);

mongoose.connect(uri)
    .then(() => console.log('Now connected to the DB!'))
    .catch(err => console.error('Something went wrong', err));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

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

//Error handlers & middlewares
if(!isProduction) {
    app.use((err, req, res) => {
      res.status(err.status || 500);
  
      res.json({
        errors: {
          message: err.message,
          error: err,
        },
      });
    });
  }

  app.use((err, req, res) => {
    res.status(err.status || 500);
  
    res.json({
      errors: {
        message: err.message,
        error: {},
      },
    });
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
