module.exports = {
    storeScanResult,
    listScanResults,
    retrieveScanResult,
    connectDb
};
const BSON = require('bson');

var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost';
global.collection = undefined;
async function connectDb() {
    const client = await mongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("Connected to Mongodb");
    collection = client.db('ScanResultDb').collection('scanresults');
    return client;
}

async function storeScanResult(scanResult) {
    const result = await collection.insertOne({
        id: scanResult.id,
        status: scanResult.status,
        repositoryName: scanResult.repositoryName,
        findings: scanResult.findings ? BSON.serialize(scanResult.findings) : null,
        queuedAt: scanResult.queuedAt ? new Date(scanResult.queuedAt) : null,
        scannedAt: scanResult.scannedAt ? new Date(scanResult.scannedAt) : null,
        finishedAt: scanResult.finishedAt ? new Date(scanResult.finishedAt) : null
    });
    return result;
}

async function listScanResults() {
    const items = await collection.find().toArray();
    for (item of items) {
        item.findings = item.findings ? BSON.deserialize(item.findings.buffer).findings.length : 0;
    }
    return items;
}

async function retrieveScanResult(id) {
    const item = await collection.findOne({
        id: id
    });
    item.findings = item.findings ? BSON.deserialize(item.findings.buffer) : '';
    return item;
}
