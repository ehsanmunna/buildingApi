// Require express and create an instance of it
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors')
var app = express();

// const router = require('express').Router();
const Sequelize = require('sequelize');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
// const swaggerDocument = require('./swagger.json');

// Option 1: Passing parameters separately
const sequelize = require('./dbConfig');
// const sequelize = new Sequelize('accounts', 'postgres', 'password', {
//   host: 'localhost',
//   dialect: 'postgres'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
// });

//Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  // const fiscalYear = sequelize.define('fiscalYear', {
  //   // attributes
  //   id: {
  //     type: Sequelize.INTEGER,
  //     allowNull: false,
  //     primaryKey: true
  //   },
  //   name: {
  //     type: Sequelize.STRING
  //   }
  // }, {
  //   // options
  // });

app.use(cors())
app.use(morgan('dev'))
// app.use(morgan('combined'))
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

app.use('/api/buildings', require('./routes/buildings'));
app.use('/api/object', require('./routes/Object'));
app.use('/api/datafield', require('./routes/DataField'));
app.use('/api/reading', require('./routes/Reading'));
// app.use('/api/offices', require('./routes/offices'));
// app.use('/api/office-bank', require('./routes/office_bank'));
// app.use('/api/budget', require('./routes/budget'));
// app.use('/api/coa', require('./routes/coa'));
// app.use('/api/operation-code', require('./routes/operation_code'));
// app.use('/api/fund-code', require('./routes/fund_code'));
// app.use('/api/bill', require('./routes/bill'));
// app.use('/api/nbr-codes', require('./routes/nbr_codes'));
// app.use('/api/transaction', require('./routes/transactions'));
// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 3000 !
app.listen(3000, function () {
    console.log('Example app listening on port 3000.');
});

module.exports = app;
