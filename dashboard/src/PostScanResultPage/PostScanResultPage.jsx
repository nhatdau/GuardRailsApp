import React from 'react';
import Datetime from 'react-datetime';
import { Link } from 'react-router-dom';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import { scanResultService } from '../_services';

class PostScanResultPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            repositoryName: '',
            status: 'Queued',
            findings: '',
            queuedAt: '',
            scannedAt: '',
            finishedAt: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeQueued = this.handleChangeQueued.bind(this);
        this.handleChangeScanned = this.handleChangeScanned.bind(this);
        this.handleChangeFinished = this.handleChangeFinished.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleChangeQueued(m) {
        this.setState({queuedAt: m});
    }

    handleChangeScanned(m) {
        this.setState({scannedAt: m});
    }

    handleChangeFinished(m) {
        this.setState({finishedAt: m});
    }
    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { id, repositoryName, status, findings, queuedAt, scannedAt, finishedAt} = this.state;
        if (!(id && repositoryName && status && (!queuedAt || moment.isMoment(queuedAt)) && (!scannedAt || moment.isMoment(scannedAt)) && (!finishedAt || moment.isMoment(finishedAt)))) {
            return;
        }

        this.setState({ loading: true });
        scanResultService.postScanResult(id, repositoryName, status, findings, queuedAt, scannedAt, finishedAt)
            .then(
                scanResult => {
                    const { from } = { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
    }

    render() {
        const { id, repositoryName, status, findings, queuedAt, scannedAt, finishedAt, submitted, loading, error } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <div>
                    <p>
                        <Link to="/">Back to list page</Link>
                    </p>
                </div>
                <h2>New Scan Result</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !id ? ' has-error' : '')}>
                        <label htmlFor="id">Id</label>
                        <input type="text" className="form-control" name="id" value={id} onChange={this.handleChange} />
                        {submitted && !id &&
                            <div className="alert alert-warning">Id is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !repositoryName ? ' has-error' : '')}>
                        <label htmlFor="repositoryName">Repository Name</label>
                        <input type="text" className="form-control" name="repositoryName" value={repositoryName} onChange={this.handleChange} />
                        {submitted && !repositoryName &&
                            <div className="alert alert-warning">Repository name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !status ? ' has-error' : '')}>
                        <label htmlFor="status">Status</label>
                        <select class="form-control" name="status" onChange={this.handleChange}>
                          <option value="Queued">Queued</option>
                          <option value="In progress">In progress</option>
                          <option value="Success">Success</option>
                          <option value="Failure">Failure</option>
                        </select>
                        {submitted && !status &&
                            <div className="alert alert-warning">Status is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="findings">Findings</label>
                        <textarea class="form-control" name="findings" value={findings} rows="10" onChange={this.handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="queuedAt">Queued At</label>
                        <Datetime  name="queuedAt" value={queuedAt} onChange={this.handleChangeQueued} utc={true}/>
                        {submitted && queuedAt && !moment.isMoment(queuedAt) &&
                            <div className="alert alert-warning">Queued at time is not valid</div>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="scannedAt">Scanned At</label>
                        <Datetime  name="scannedAt" value={scannedAt} onChange={this.handleChangeScanned} utc={true} />
                        { submitted && scannedAt && !moment.isMoment(scannedAt) &&
                            <div className="alert alert-warning">Scanned at time is not valid</div>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="finishedAt">Finished At</label>
                        <Datetime  name="finishedAt" value={finishedAt} onChange={this.handleChangeFinished} utc={true} />
                        { submitted && finishedAt && !moment.isMoment(finishedAt) &&
                            <div className="alert alert-warning">Finished at time is not valid</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" disabled={loading}>Submit</button>
                        {loading &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                    {error &&
                        <div className={'alert alert-danger'}>{error}</div>
                    }
                </form>
            </div>
        );
    }
}

export { PostScanResultPage };
