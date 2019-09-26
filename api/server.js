require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_helpers/error-handler');
const scanResultService = require('./scan_result/scanresult.service');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/scanResult', require('./scan_result/scanresults.controller'));
app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
scanResultService.connectDb().then((client) => {
    const server = app.listen(port, function () {
        console.log('Server listening on port ' + port);
    });
})
.catch((err) => console.error(err));

module.exports = app;
