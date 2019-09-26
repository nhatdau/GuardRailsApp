const expect  = require('chai').expect;
const app = require('../server');
const request = require('supertest');

describe('Test apis', () => {
    before((done) => {
        var interval = setInterval(() => {
            if (typeof collection !== 'undefined') {
                clearInterval(interval);
                collection.deleteMany({});
                done();
            }
        }, 500);
    });
    it('should store 1 new scan result when call store api', (done) => {
        request(app).post('/scanResult')
        .send({"id": 1, "status": "Success", "repositoryName": "test", "findings": {"findings":
             [
                {
                  "type": "sast",
                  "ruleId": "G402",
                  "location": {
                    "path": "connectors/apigateway.go",
                    "positions": {
                      "begin": {
                        "line": 60
                      }
                    }
                  },
                  "metadata": {
                    "description": "TLS InsecureSkipVerify set true.",
                    "severity": "HIGH"
                  }
                }
            ]}, "queuedAt": "2012-04-23T18:25:43.511Z", "scannedAt": "2012-04-23T18:25:44.511Z", "finishedAt": "2012-04-23T18:25:45.511Z"})
        .then((res) => {
            const body = res.body;
            expect(body.message).to.equal('Success');
            done();
        })
        .catch((err) =>done(err));
    });
    it('should return 1 scan result has id 1 when call api with id 1', (done) => {
        request(app).get('/scanResult/1').then((res) => {
            const body = res.body;
            expect(body.id).to.equal(1);
            done();
        })
        .catch((err) =>done(err));
    });
    it('should return 1 list of scan results has size = 1', (done) => {
                request(app).get('/scanResult').then((res) => {
                    const body = res.body;
                    expect(body.length).to.equal(1);
                    done();
                })
                .catch((err) =>done(err));
    });
})
