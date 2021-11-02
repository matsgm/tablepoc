var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

let articles = [
  {
    id: uuidv4(),
    title: 'Slik forsøker svindlerne å lure til seg BankID-en din',
    published: '2020-12-09T16:00:57.000Z',
    site: 'DinSide',
    adGroup: 'GDPR ute av kontroll',
    bids: 100446,
    spending: 13871,
    winRate: 0.97,
    impressions: 97025,
    clicks: 51,
    ctr: 0.005,
  },
];

router.get('/', function (req, res, next) {
  res.send(articles);
});

router.post('/', function (req, res, next) {
  const newObject = {
    ...req.body,
    id: uuidv4(),
  };
  articles.push(newObject);
  res.send(articles);
});

module.exports = router;
