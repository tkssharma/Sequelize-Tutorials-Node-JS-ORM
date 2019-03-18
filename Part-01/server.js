const express = require('express');
const Sequelize = require('sequelize');
const Data = require('./data');
const app = express();
const port = 8001;

const connection = new Sequelize('CartDB', 'root', 'root', {
  dialect: 'mysql'
})

const Feedback = connection.define('Feddback', {
  comments: Sequelize.STRING
});
const Recipe = connection.define('Recipe', {
  name: Sequelize.STRING,
  description: Sequelize.STRING
});
const Cook = connection.define('Cook', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'tkssharma'
  },
  email: {
    validate: {
      isEmail: true,
    },
    type: Sequelize.STRING,
  },
  type: Sequelize.STRING
});


Recipe.belongsTo(Cook, { as: 'CookRef', foreignKey: 'cookId' });     // puts foreignKey userId in Post table
Recipe.hasMany(Feedback, { as: 'comments' });

app.get('/recipes', (req, res) => {
  Recipe.findAll({
    include: [{
      model: Cook, as: 'CookRef'  
    }]
  }) 
  .then(cook => {
    res.json(cook);
  })
  .catch(error => {
    console.log(error);
    res.status(404).send(error);
  })
})
app.get('/cooks', (req, res) => {
  Cook.findAll() 
  .then(cook => {
    res.json(cook);
  })
  .catch(error => {
    console.log(error);
    res.status(404).send(error);
  })
})

app.get('/cook', (req, res) => {
  Cook.findOne({
    where : {id : 1},
    include: [{
      model: Feedback, as: 'comments' ,
      model : Recipe
    }]
  }) 
  .then(cook => {
    res.json(cook);
  })
  .catch(error => {
    console.log(error);
    res.status(404).send(error);
  })
})
app.get('/recipe/:id', (req, res) => {
  Recipe.findOne({
    where : {id : req.params.id},
    include: [{
      model: Feedback, as: 'comments',
      model: Cook, as: 'CookRef' 
    }]
  }) 
  .then(cook => {
    res.json(cook);
  })
  .catch(error => {
    console.log(error);
    res.status(404).send(error);
  })
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
  .then(() => {
    Cook.bulkCreate(Data)
      .then(() => {
        console.log('user inserted successfully');
      })
      .catch(error => {
        console.log(error);
      })
  })
  .then(() => {
    Recipe.bulkCreate([{
      cookId : 1,
      name : "sabji North Indian",
      description : "olaolao"
    }])
      .then(() => {
        console.log('Recipe inserted successfully');
      })
      .catch(error => {
        console.log(error);
      })
  })
  .then(() => {
    Feedback.create({
      RecipeId : 1,
      comments : "sabji North Indian"
    })
    .then(() => {
        console.log('feedback inserted successfully');
    })
    .catch(error => {
        console.log(error);
      })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });





