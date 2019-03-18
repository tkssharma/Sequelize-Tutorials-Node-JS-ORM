const express = require('express');
const Sequelize = require('sequelize');
const Data = require('./data');
const app = express();
const port = 8001;

const connection = new Sequelize('CartDB', 'root', 'root', {
  dialect: 'mysql'
})
//*** When you are retrieving data from the database there is a fair chance that you also want to get associations with the same query - this is called eager loading. The basic idea behind that, is the use of the attribute include when you are calling find or findAll. Lets assume the following setup ****/
//
const User = connection.define('user', { name: Sequelize.STRING })
const Task = connection.define('task', { name: Sequelize.STRING })
const Tool = connection.define('tool', { name: Sequelize.STRING })

Task.belongsTo(User)
User.hasMany(Task)
User.hasMany(Tool, { as: 'Instruments' })

Task.findAll({ include: [ User ] }).then(tasks => {
   console.log(JSON.stringify(tasks))
})
User.findAll({ include: [ Task ] }).then(users => {
  console.log(JSON.stringify(users))
})
User.findAll({ include: [{ model: Tool, as: 'Instruments' }] }).then(users => {
    console.log(JSON.stringify(users))
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
    force: true
  })
  .then(() => {
    console.log('Connection to database established successfully.');
    app.listen(port, () => {
      console.log('Running server on port ' + port);
    });
  })
  .then(() => {
    User.bulkCreate(Data)
      .then(() => {
        console.log('user inserted successfully');
      })
      .catch(error => {
        console.log(error);
      })
  })
  .then(() => {
    Task.bulkCreate([{
      userId : 1,
      name : "TASK"
    }])
      .then(() => {
        console.log('TASK inserted successfully');
      })
      .catch(error => {
        console.log(error);
      })
  })
  .then(() => {
    Tool.bulkCreate([{
      userId : 1,
      name : "TOOL"
    }])
      .then(() => {
        console.log('TOOL inserted successfully');
      })
      .catch(error => {
        console.log(error);
      })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });





