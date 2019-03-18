const express = require('express');
const Sequelize = require('sequelize');
const app = express();
const port = 8001;
const Models = require('./models');
//Sync Database

Models.sequelize.sync({
    force : false,
    logging : console.log
}).then(function () {
    console.log('Nice! Database looks fine')

}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
});
app.get('/customers', (req, res) => {
    Models.Customers.findAll() 
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(404).send(error);
    })
  })
//---------------------------------------------//
app.listen(8001,
    () => {
        const port = '8001'
        console.log('runing...')
    }
);
