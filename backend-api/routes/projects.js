var express = require('express');
var router = express.Router();
const knex = require('../knexModule');

// Get projects list
router.get('/', (req, res) => {
    knex.from('projects').select()
    .then((projects) => {
      if (!projects) {
        return res.status(404).send({
          success: 'Fail',
          message: 'Database have not any user!',
        });
      }
      return res.status(200).send({
        success: 'Success',
        message: 'User found!',
        projects
      });
    }).catch((error) => {
      res.status(404).send({
        success: 'Fail',
        message: 'Some error occurred. Please try again',
        error: error
      });
    })
  });

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
                project
            });
        }).catch((error) => {
            res.status(504).send({
                success: 'Fail',
                message: 'Some error occurred. Please try again',
                error
            });
        })
});

/* Create user */
router.post('/', function (req, res) {
    const reqData = req.body.project
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

router.put('/:id', (req, res) => {
    const reqParams = req.params
    const reqData = req.body.project
    knex.select('id')
        .from('projects')
        .where({
            id: reqParams.id
        })
        .then(([row]) => {
            if (!row) {
                return res.status(404).send({
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
            res.status(404).send({
                success: 'Fail',
                message: 'Some error occurred. Please try again',
                error: error
            });
        });
});

// API Assign user to project as a member.
router.post('/members', (req, res) => {
    const reqMemberIds = req.body.projectMembers.memberIds;
    const project_id = req.body.projectMembers.projectId;
    const fieldsInsert = reqMemberIds.map(id => 
        ({ user_id: id, project_id: project_id })
    ); 
    console.log(fieldsInsert)
    knex('project_members').insert(fieldsInsert).then(() => {
        res.status(200).send({
            status: 'Success',
            message: 'Add user successfully!',
        });
    }).catch((error) => {
        res.status(404).send({
            success: 'Fail',
            message: 'Some error occurred. Please try again',
            error: error
        });
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
        res.status(200).send({
            status: 'Success',
            message: 'Successfully!',
            members,
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