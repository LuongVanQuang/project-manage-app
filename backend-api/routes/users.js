var express = require('express');
var router = express.Router();
const knex = require('../knexModule');
/* GET user by id. */
router.get('/:id', (req, res) => {
  const reqParams = req.params;
  knex('users').where({id: reqParams.id}).select()
  .then(([user]) => {
    if (!user) {
      return res.status(501).send({
        success: 'Fail',
        message: 'User not found!',
      });
    }
    return res.status(200).send({
      success: 'Success',
      message: 'User found!',
      data: user
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
  knex('users').select().where({
    phone: reqData.phone
  }).then((records) => {
    if (records.length !== 0) {
      res.status(202).send({
        status: 'Fail',
        message: 'User already exists. Please login!',
      });
    } else {
      knex('users').insert({
        name: reqData.name,
        phone: reqData.phone,
        birthday: reqData.birthday
      }).then((user) => {
        res.status(200).send({
          status: 'Success',
          message: 'Successfully registered!',
        });
      });
    }
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
  .from('users')
  .where({ id: reqParams.id })
  .then(([row]) => {
    if (!row) {
      return res.status(501).send({
        success: 'Fail',
        message: 'User not found!',
      });
    }
    knex('users').update({
      name: reqData.name,
      phone: reqData.phone,
      birthday: reqData.birthday
    }).where({id: row.id}).then( () =>{
      return  res.status(200).send({
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

router.get('/:id/projects', (req, res) => {
  const userId = parseInt(req.params.id);
  knex('projects')
  .select()
  .innerJoin('project_members', 'projects.id', 'project_members.project_id')
  .where('project_members.user_id', userId)
  .then((raw) => {
    if (raw.length === 0) {
      return res.status(404).send({
        status: 'Fail',
        message: 'Not projects!',
    });
    }
      res.status(200).send({
          status: 'Success',
          message: 'Successfully!',
          data: raw,
      });
  }).catch((error) => {
      res.status(404).send({
          success: 'Fail',
          message: 'Some error occurred. Please try again',
          error: error
      });
  });
});

module.exports = router;