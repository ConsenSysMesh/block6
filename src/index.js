import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/';
import MyProvider, { MyContext } from './Provider';

import './index.css';


ReactDOM.render(
  <MyProvider>
    <MyContext.Consumer>
      {context =>
        <App context={context} />
      }
    </MyContext.Consumer>
  </MyProvider>,
  document.getElementById('root')
);
