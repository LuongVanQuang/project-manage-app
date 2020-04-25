var express = require('express');
var router = express.Router();
const knex = require('../knexModule');

const makeResponse = (res, params, dataResponse = {}) => {
    return res.status(params.statusCode).send({
        success: params.success,
        message: params.message,
        dataResponse
    })
}
// Get projects list
router.get('/', (req, res) => {
    knex.from('projects')
        .select()
        .then((projects) => {
            let params = {};
            if (!projects) {
                params = {
                    statusCode: 404,
                    success: 'Fail',
                    message: "Database have not any project!"
                }
            } else {
                params = {
                    statusCode: 200,
                    success: 'Success',
                    message: "List projects!"
                }
            }
            makeResponse(res, params, projects)
        }).catch((error) => {
            let params = {
                statusCode: 404,
                success: 'Fail',
                message: "Some error occurred. Please try again"
            }
            makeResponse(res, params, error)
        })
});

/* GET project by id. */
router.get('/:id', (req, res) => {
    const reqParams = req.params;
    knex('projects')
        .where({
            id: reqParams.id
        })
        .select()
        .then(([project]) => {
            let params = {};
            if (!project) {
                params = {
                    statusCode: 404,
                    success: 'Fail',
                    message: "Project not found!"
                }
            } else {
                params = {
                    statusCode: 200,
                    success: 'Success',
                    message: "Project found!"
                }
            }
            makeResponse(res, params, project)
        }).catch((error) => {
            let params = {
                statusCode: 404,
                success: 'Fail',
                message: "Some error occurred. Please try again"
            }
            makeResponse(res, params, error)
        })
});

/* Create project */
router.post('/', function (req, res) {
    const reqData = req.body.project
    knex('projects').insert({
        name: reqData.name,
        description: reqData.description,
    }).then((project) => {
        let params = {
            statusCode: 200,
            success: 'Success',
            message: "Project create successful!"
        }
        makeResponse(res, params, project)
    }).catch((error) => {
        let params = {
            statusCode: 404,
            success: 'Fail',
            message: "Some error occurred. Please try again"
        }
        makeResponse(res, params, error)
    });
});

router.put('/:id', (req, res) => {
    const reqParams = req.params
    const reqData = req.body.project
    knex('projects').update({
            name: reqData.name,
            description: reqData.description,
        })
        .where({
            id: reqParams.id
        })
        .then((project) => {
            let params = {};
            if (!project) {
                params = {
                    statusCode: 404,
                    success: 'Fail',
                    message: "Update fail!"
                }
            } else {
                params = {
                    statusCode: 200,
                    success: 'Success',
                    message: "Project updated successful!"
                }
            }
            makeResponse(res, params);
        }).catch((error) => {
            let params = {
                statusCode: 404,
                success: 'Fail',
                message: "Some error occurred. Please try again"
            }
            makeResponse(res, params, error);
        });
});

// API Assign member to project.
router.post('/members', (req, res) => {
    const reqMemberIds = req.body.projectMembers.memberIds;
    const project_id = req.body.projectMembers.projectId;
    const fieldsInsert = reqMemberIds.map(id =>
        ({
            user_id: id,
            project_id: project_id
        })
    );
    knex('project_members').insert(fieldsInsert).then(() => {
        let params = {
            statusCode: 200,
            success: 'Success',
            message: "Add user successful!"
        }
        makeResponse(res, params);
    }).catch((error) => {
        let params = {
            statusCode: 404,
            success: 'Fail',
            message: "Some error occurred. Please try again"
        }
        makeResponse(res, params, error);
    });
});

// API get all members of project.
router.get('/:id/members', (req, res) => {
    const projectId = parseInt(req.params.id);
    knex('users')
        .select()
        .innerJoin('project_members', 'users.id', 'project_members.user_id')
        .where('project_members.project_id', projectId)
        .then((members) => {
            let params = {
                statusCode: 200,
                success: 'Success',
                message: "Get all members successful!"
            }
            makeResponse(res, params, members);
        }).catch((error) => {
            let params = {
                statusCode: 404,
                success: 'Fail',
                message: "Some error occurred. Please try again"
            }
            makeResponse(res, params, error);
        });
});

module.exports = router;