import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import routes from './src/index.js';

const app = express();

/**
 * Connect to Db
 */

mongoose.connect('mongodb://localhost:27017')

 /**
  * 
  */

 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());

 app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

routes(app);

export default app;

 