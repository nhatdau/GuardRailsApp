import config from 'react-global-configuration';

export const scanResultService = {
    loadAll,
    retrieveFindingsOfScanResult,
    postScanResult
};

function loadAll() {
    return fetch(`${config.get('apiUrl')}/scanResult`)
        .then(handleResponse)
        .then(scanResults => {
            return scanResults;
        });
}

function retrieveFindingsOfScanResult(id) {
    return fetch(`${config.get('apiUrl')}/scanResult/${id}`)
        .then(handleResponse)
        .then(scanResult => {
            return scanResult.findings ? scanResult.findings.findings : [];
        });
}

function postScanResult(id, repositoryName, status, findings, queuedAt, scannedAt, finishedAt) {
    id = parseInt(id);
    queuedAt = queuedAt ? queuedAt.utc().format() : '';
    scannedAt = scannedAt ? scannedAt.utc().format() : '';
    finishedAt = finishedAt ? finishedAt.utc().format() : '';
    findings = findings ? JSON.parse(findings) : '';
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id,
            repositoryName,
            status,
            findings,
            queuedAt,
            scannedAt,
            finishedAt
        })
    };
    return fetch(`${config.get('apiUrl')}/scanResult`, requestOptions)
        .then(handleResponse)
        .then(result => {
            return result;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
