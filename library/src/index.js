import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import { Router, Route, Link, browserHistory } from 'react-router-dom'
import App from './App';
import { Provider } from 'react-redux'
import store from './store'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import ReduxToastr from 'react-redux-toastr'


ReactDOM.render(
    <Provider store={store}>
    {/* <ConnectedRouter history={history}> */}
      <Router >
      <ReduxToastr
      timeOut={2500}
      newestOnTop={false}
      preventDuplicates
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick/>
        <App />
      </Router>
    {/* </ConnectedRouter> */}
  </Provider>
, document.getElementById('root'));
