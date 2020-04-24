var express = require('express');
var router = express.Router();
const knex = require('../knexModule');
/* GET user by id. */
router.get('/:id', (req, res) => {
    const reqParams = req.params;
    knex('projects')
        .where({
            id: reqParams.id
        })
        .select()
        .then(([project]) => {
            if (!project) {
                return res.status(501).send({
                    success: 'Fail',
                    message: 'Project not found!',
                });
            }
            return res.status(200).send({
                success: 'Success',
                message: 'Project found!',
                data: project
            });
        }).catch((error) => {
            res.status(504).send({
                success: 'Fail',
                message: 'Some error occurred. Please try again',
                error: error
            });
        })
});

/* Create user */
router.post('/create', function (req, res) {
    const reqData = req.body
    knex('projects').insert({
        name: reqData.name,
        description: reqData.description,
    }).then((project) => {
        res.status(200).send({
            status: 'Success',
            message: 'Successfully registered!',
            data: project
        });
    }).catch((error) => {
        res.status(200).send({
            success: 'Fail',
            message: 'Some error occurred. Please try again',
            error: error
        });
    });
});

router.post('/update/:id', (req, res) => {
    const reqParams = req.params
    const reqData = req.body
    knex.select('id')
        .from('projects')
        .where({
            id: reqParams.id
        })
        .then(([row]) => {
            if (!row) {
                return res.status(501).send({
                    success: 'Fail',
                    message: 'Project not found!',
                });
            }
            knex('projects').update({
                name: reqData.name,
                description: reqData.description,
            }).where({
                id: row.id
            }).then(() => {
                return res.status(200).send({
                    status: 'Success',
                    message: 'Successfully Updated!',
                });
            })
        }).catch((error) => {
            res.status(503).send({
                success: 'Fail',
                message: 'Some error occurred. Please try again',
                error: error
            });
        });
});

router.post('/members', (req, res) => {
    const reqData = req.body;
    knex('project_members').insert({
        user_id: reqData.user_id,
        project_id: reqData.project_id,
    }).then(() => {
        res.status(200).send({
            status: 'Success',
            message: 'Add user successfully!',
        });
    }).catch((error) => {
        res.status(200).send({
            success: 'Fail',
            message: 'Some error occurred. Please try again',
            error: error
        });
    });
});

router.get('/:id/members', (req, res) => {
    const projectId = parseInt(req.params.id);
    knex('users')
    .select()
    .innerJoin('project_members', 'users.id', 'project_members.user_id')
    .where('project_members.project_id', projectId)
    .then((raw) => {
        res.status(200).send({
            status: 'Success',
            message: 'Successfully!',
            data: raw,
        });
    }).catch((error) => {
        res.status(200).send({
            success: 'Fail',
            message: 'Some error occurred. Please try again',
            error: error
        });
    });
});

module.exports = router;