var express = require('express');
var router = express.Router();
const knex = require('../knexModule');

const makeResponse = (res, params, dataResponse = {}) => {
  res.status(params.statusCode).send({
    success: params.success,
    message: params.message,
    dataResponse
  })
}
// Get users list
router.get('/', (req, res) => {
  knex.from('users')
      .select()
      .then((users) => {
          let params = {};
          if (!users) {
              params = {
                statusCode: 404,
                success: 'Fail',
                message: "Database have not any user!"
              }
          } else {
              params = {
                statusCode: 200,
                success: 'Success',
                message: "List users!"
              }
          }
          makeResponse(res, params, users)
        })
      .catch((error) => {
          let params = {
            statusCode: 404,
            success: 'Fail',
            message: "Some error occurred. Please try again"
          }
          makeResponse(res, params, error)
      })
});

/* GET user by id. */
router.get('/:id', (req, res) => {
  const reqParams = req.params;
  knex('users')
    .where({ id: reqParams.id })
    .select()
    .then(([user]) => {
      let params = {};
      if (!user) {
        params = {
          statusCode: 404,
          success: 'Fail',
          message: "User not found!"
        }
      } else {
        params = {
          statusCode: 200,
          success: 'Success',
          message: "User found!"
        }
      }
      makeResponse(res, params, user)
    }).catch((error) => {
      let params = {
        statusCode: 404,
        success: 'Fail',
        message: "Some error occurred. Please try again"
      }
      makeResponse(res, params, error)
    })
});

/* Create user */
router.post('/', function (req, res) {
  const reqData = req.body.user
  knex('users').insert({
      name: reqData.name,
      phone: reqData.phone,
      birthday: new Date(reqData.birthday)
    })
    .then(() => {
      let params = {};
      params = {
        statusCode: 200,
        success: 'Success',
        message: "User create successful!"
      }
      makeResponse(res, params)
    })
    .catch((error) => {
      let params = {
        statusCode: 404,
        success: 'Fail',
        message: "User already exists. Please login!"
      }
      makeResponse(res, params, error)
    });
});

router.put('/:id', (req, res) => {
  const reqParams = req.params
  const reqData = req.body.user
  knex('users')
      .update({
        name: reqData.name,
        phone: reqData.phone,
        birthday: new Date(reqData.birthday)
      })
      .where({ id: reqParams.id })
      .then((user) => {
        let params = {};
        if (!user) {
          params = {
            statusCode: 404,
            success: 'Fail',
            message: "User update fail!"
          }
        } else {
          params = {
            statusCode: 200,
            success: 'Success',
            message: "User updated successful!!"
          }
          makeResponse(res, params)
      }
      })
      .catch((error) => {
        let params = {
          statusCode: 404,
          success: 'Fail',
          message: "Some error occurred. Please try again!"
        }
        makeResponse(res, params, error)
      });
});

router.get('/:id/projects', (req, res) => {
  const userId = parseInt(req.params.id);
  knex('projects')
    .select()
    .innerJoin('project_members', 'projects.id', 'project_members.project_id')
    .where('project_members.user_id', userId)
    .then((projects) => {
      let params = {};
      if (!projects) {
        params = {
          statusCode: 404,
          success: 'Fail',
          message: "No projects found!"
        }
      } else {
        params = {
          statusCode: 200,
          success: 'Success',
          message: "Projects found!"
        }
      }
      makeResponse(res, params, projects)
    }).catch((error) => {
      let params = {
        statusCode: 404,
        success: 'Fail',
        message: "Some error occurred. Please try again!"
      }
      makeResponse(res, params, error)
    });
});

module.exports = router;