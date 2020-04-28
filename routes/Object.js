var express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../dbConfig');
const _Object = require('../models/Object')(sequelize, Sequelize);
const common = require('../middleware/common')(_Object);
var faker = require('faker');

router.get('/', common.findAll);
router.post('/', common.SaveWithId);
router.get('/:id', common.findById);
router.get('/name/:name', common.findByName);
router.put('/', common.update);
router.delete('/:id', common.delete);

router.post('/generate', async (req, res) => {
    let max = await _Object.max('Id');
    
    let bulkObject = [];
    for (let i = 0; i < 100; i++) {
        max = max ? max + 1 : 1;
        bulkObject.push({
            Id: max,
            Name: faker.random.word()
        })
    }
    try {
        var resp = await _Object.bulkCreate(bulkObject)
        res.send(resp);
    } catch (error) {
        res.statusCode(500).send(error)
    }
});

module.exports = router;
