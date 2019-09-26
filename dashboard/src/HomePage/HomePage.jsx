import React from 'react';
import { Link } from 'react-router-dom';
import { scanResultService } from '../_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scanResults: []
        };
    }

    componentDidMount() {
        scanResultService.loadAll().then(list =>{
            this.setState({scanResults: list});
        });
    }

    render() {
        const {scanResults} = this.state;
        return (
            <div>
                <div>
                    <p>
                        <Link to="/postScanResult">Post a new scan result</Link>
                    </p>
                </div>
                <div>
                    <table class="table table-hover table-bordered">
                          <thead class="thead-dark">
                            <tr>
                              <th scope="col">Id</th>
                              <th scope="col">Repository Name</th>
                              <th scope="col">Status</th>
                              <th scope="col">Queued At</th>
                              <th scope="col">Scanned At</th>
                              <th scope="col">Finished At</th>
                              <th scope="col">Findings</th>
                            </tr>
                          </thead>
                          <tbody>
                            {scanResults.map(item =>
                                <tr>
                                  <th scope="row">{item.id}</th>
                                  <td>{item.repositoryName}</td>
                                  <td>{item.status}</td>
                                  <td>{item.queuedAt}</td>
                                  <td>{item.scannedAt}</td>
                                  <td>{item.finishedAt}</td>
                                  <td><h3><Link to={item.findings > 0 ? "/showFindings/" + item.id:"#"} class="badge badge-info">{item.findings}</Link></h3></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            );
    }
}

export { HomePage };
