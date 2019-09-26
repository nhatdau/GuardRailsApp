import React from 'react';
import { Link } from 'react-router-dom';
import { scanResultService } from '../_services';

class ShowFindingsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            findings: []
        };
    }

    componentDidMount() {
        scanResultService.retrieveFindingsOfScanResult(this.props.match.params.id).then(list =>{
            this.setState({findings: list});
        });
    }

    render() {
        const {findings} = this.state;
        return (
            <div>
                <div>
                    <p>
                        <Link to="/">Back to list page</Link>
                    </p>
                </div>
                <div>
                    <table class="table table-hover table-bordered">
                          <thead class="thead-dark">
                            <tr>
                              <th scope="col">Rule Id</th>
                              <th scope="col">Description</th>
                              <th scope="col">Severity</th>
                              <th scope="col">Path name</th>
                              <th scope="col">Line of code</th>
                            </tr>
                          </thead>
                          <tbody>
                            {findings.map(item =>
                                <tr>
                                  <th scope="row">{item.ruleId}</th>
                                  <td>{item.metadata.description}</td>
                                  <td>{item.metadata.severity}</td>
                                  <td>{item.location.path}</td>
                                  <td>{item.location.positions.begin.line}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            );
    }
}

export { ShowFindingsPage };
