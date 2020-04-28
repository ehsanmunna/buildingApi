var express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../dbConfig');
const Reading = require('../models/Reading')(sequelize, Sequelize)
const common = require('../middleware/common')(Reading)
const Op = Sequelize.Op;
var faker = require('faker');
var moment = require('moment');

router.get('/', findAll);
router.post('/', common.save);
router.get('/:id', common.findById);
router.put('/', common.update);
router.delete('/:id', common.delete);

async function findAll(req, response) {
    let objKeys = Object.keys(req.query);
    let qObj = {};
    for (let i = 0; i < objKeys.length; i++) {
        const element = objKeys[i];
        if (element !== 'startDate' && element !== 'endDate') {
            if (req.query[element] !== "null") {
                qObj[element] = req.query[element];
            }
        }
    }

    if (req.query.startDate && req.query.endDate) {
        qObj['Timestamp'] = {
            [Op.between]: [Sequelize.fn('convert', Sequelize.col('varchar'), req.query.startDate, 20), Sequelize.fn('convert', Sequelize.col('varchar'), req.query.endDate, 20)]
        }
    }


    const whereQ = {
        where: qObj
    };
    try {
        var result = await Reading.findAll(whereQ);
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
}

router.post('/generate', async (req, res) => {
    let totalRow = 24 * 60 * 3;
    let totalBuilding = 2;
    
    let initialTime = '2020-01-01 00:00:00';
    let bulkRender = [];
    // loop each building
    for (let i = 0; i < totalBuilding; i++) {
        let buildingId = i + 1;
        console.log('building: ', buildingId);
        for (let t = 0; t < totalRow; t++) {
            //Add one minute
            var dt = new Date(initialTime);
            dt.setMinutes(dt.getMinutes() + 1);
            const time = moment(dt).format('YYYY-MM-DD HH:mm:ss');
            initialTime = time;
            console.log('time: ', time);
            // loog ten datapoint for this time
            for (let j = 0; j < 10; j++) {
                let elem = {
                    BuildingId: buildingId,
                    ObjectId: 1,
                    DataFieldId: 1,
                    Value: numberGen(time), // faker.random.number(30),
                    Timestamp: Sequelize.fn('convert', Sequelize.col('varchar'), time, 20),
                }
                bulkRender.push(elem);
            }
        }
    }

    try {
        var resp = await Reading.bulkCreate(bulkRender)
        res.send("Success!! " + bulkRender.length);
    } catch (error) {
        res.statusCode(500).send(error)
    }

    function numberGen(time){
        let randRange = 10;
        const _time = new Date(time).getHours();
        if (time > 8 && time < 10) {
            randRange = 25;
        }
        if (time > 10 && time < 20) {
            randRange = 7;
        }

        return faker.random.number(randRange);
    }
});

module.exports = router;
