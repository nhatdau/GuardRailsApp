import React from 'react';
import { render } from 'react-dom';
import config from 'react-global-configuration';

import { App } from './App';

config.set({apiUrl : 'http://localhost:4000'});
render(<App />,document.getElementById('app'));
