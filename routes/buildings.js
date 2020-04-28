var express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../dbConfig');
const buildings = require('../models/Building')(sequelize, Sequelize);
const common = require('../middleware/common')(buildings);
var faker = require('faker'); 

router.get('/', common.findAll);
router.post('/', common.SaveWithId);
router.get('/:id', common.findById);
router.get('/name/:name', common.findByName);
router.put('/', common.update);
router.delete('/:id', common.delete);

router.post('/generate', async (req, res) => {
    let max = await buildings.max('Id');
    
    let bulkBuilding = [];
    for (let i = 0; i < 100; i++) {
        max = max ? max + 1 : 1;
        bulkBuilding.push({
            Id: max,
            Name: faker.random.word(),
            Location: "dhaka" // , faker.address.city()
        })
    }
    try {
        var resp = await buildings.bulkCreate(bulkBuilding)
        res.send(resp);
    } catch (error) {
        res.statusCode(500).send(error)
    }
});



module.exports = router;
