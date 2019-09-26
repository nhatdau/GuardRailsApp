const express = require('express');
const router = express.Router();
const scanResultService = require('./scanresult.service');

router.post('/', postScanResult);
router.get('/:id', retrieveScanResult);
router.get('/', listScanResults);

module.exports = router;

function postScanResult(req, res, next) {
    scanResultService.storeScanResult(req.body).then(result => result.insertedCount == 1 ? res.json({message: "Success"}) : res.json({message: "Store scan result is not success"}))
    .catch(err => next(err));
}

function retrieveScanResult(req, res, next) {
    scanResultService.retrieveScanResult(parseInt(req.params.id)).then(result => res.json(result))
    .catch(err => next(err));
}

function listScanResults(req, res, next) {
    scanResultService.listScanResults().then(result => res.json(result))
    .catch(err => next(err));
}
