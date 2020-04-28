
const uuid = require('uuid').v4;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function (_model) {
    async function findAll(request, response) {
        const whereQ = { where: request.query};
        try {
            var result = await _model.findAll(whereQ);
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    }

    async function findQ(request, response) {
        try {
            var result = await _model.findAll({where: request.query});
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    }

    async function findById(request, response) {
        try {
            var res = await _model.findByPk(request.params.id);
            response.send(res);
        } catch (error) {
            response.status(500).send(error);
        }
    }

    async function findByName(request, response) {
        try {
            var result = await _model.findAll(
                {
                where: {Name: { [Op.like]: '%'+request.params.name+'%'} }
              }
              );
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    }

    async function Save(req, res) {
        req.body.Timestamp = new Date(req.body.Timestamp).toISOString()
        console.log(req.body)
        try {
            var resp;
            if (Array.isArray(req.body)) {
               resp = await _model.bulkCreate(req.body, { ignoreDuplicates: true })
            } else {
               resp = await _model.create(req.body);
            }
            res.send(resp);
        } catch (error) {
            res.statusCode(500).send(error)
        }
    }

    async function SaveWithId(req, res) {
        let max = await _model.max('Id');
        req.body.Id = max ? max + 1 : 1;
        return Save(req, res);
    }
    
    async function Update(req, res) {
        try {
            var resp = _model.update(
                req.body,
                { where: {oid: req.body.oid} }
            )
            res.send(resp);
        } catch (error) {
            res.statusCode(500).send(error)
        }
    }

    async function Delete(req, res) {
        try {
            var resp = _model.destroy({
                where: req.params
            })
            res.send(resp);
        } catch (error) {
            res.statusCode(500).send(error)
        }
    }
    return {
        findAll: findAll,
        findById: findById,
        findByName: findByName,
        save: Save,
        SaveWithId: SaveWithId,
        findQ: findQ,
        update: Update,
        delete: Delete,
    }
};