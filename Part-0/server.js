const express = require('express');
const Sequelize = require('sequelize');
const Data = require('./data');
const app = express();
const port = 8001;

const connection = new Sequelize('CartDB', 'root', 'root', {
  dialect: 'mysql'
})

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been  established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database: ', err);
  });

connection
  .sync({
    logging: console.log,
    force: false
  })
  .then(() => {
    console.log('Connection to database established successfully.');
    app.listen(port, () => {
      console.log('Running server on port ' + port);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });





