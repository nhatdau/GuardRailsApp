import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { HomePage } from '../HomePage';
import { PostScanResultPage } from '../PostScanResultPage';
import { ShowFindingsPage } from '../ShowFindingsPage';

class App extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        <Router>
                            <div>
                                <Route exact path="/" component={HomePage} />
                                <Route exact path="/postScanResult" component={PostScanResultPage} />
                                <Route exact path="/showFindings/:id" component={ShowFindingsPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export { App };
