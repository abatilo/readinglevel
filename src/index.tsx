import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-149336980-1');
ReactGA.pageview(window.location.pathname + window.location.search);
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
