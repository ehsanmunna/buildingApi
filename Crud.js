var express = require('express');
const router = express.Router();
const crudFunc = function(Model){
    router.get('/', async(request, response) => {
        try {
            var list = await Model.find().exec();
            response.send(list);
        } catch (error) {
            response.status(500).send(error);
        }
    });
    router.get('/:id', async (request, response) => {
        try {
            var meterConf = await Model.findById(request.params.id).exec();
            response.send(meterConf);
        } catch (error) {
            response.status(500).send(error);
        }
    });
    
    router.post('/', (req, res) => {
        Model.create(req.body, function(err, result){
            if (err) {
                res.status(500).json({message: err})
            }
            res.status(201).send(result);
        })
    });
    
    router.put('/:id', async (request, response) => {
        try {
            var meterConf = await Model.findById(request.params.id).exec();
            meterConf.set(request.body);
            var result = await meterConf.save();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });
    
    router.delete("/:id", async (request, response) => {
        try {
            var result = await Model.deleteOne({ _id: request.params.id }).exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });
    return router
}
module.exports = crudFunc;

