const express = require('express');
const router = express.Router();
const axios = require('axios');
const moment = require('moment');

const indexController = require('../controllers/index');

router.get('/', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Welcome to Express!';
  indexController.sum(1, 2, (error, results) => {
    if (error) return next(error);
    if (results) {
      renderObject.sum = results;
      res.render('index', renderObject);
    }
  });
});

router.get('/arrivals', function (req, res, next) {
  var endpoint = process.env.ENDPOINT;
  axios({
    method: 'get',
    url: endpoint,
    headers: {
      'X-Mashape-Key': 'muJfCGYwFZmsh4ynahJkVDzGTUMwp1M35P2jsnSkwscJ9PZ3ip',
      Accept: 'application/json'
    }
  })
    .then(function (response) {
      // response.data.data[0].arrivals.map((arrival) => {
      //   var diff = moment(arrival.arrival_at).diff(moment());
      //   console.log(
      //     moment(arrival.arrival_at).format('h:mm:ss'),
      //     moment(diff).format('mm:ss')
      //     );
      // });
      var diff = moment(response.data.data[0].arrivals[0].arrival_at).diff(moment());
      var diffFormatted = moment(diff).format('mm:ss');
      var arrival = moment(response.data.data[0].arrivals[0].arrival_at).format('h:mm:ss');
      res.status(200).send({diffFormatted, arrival});
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
