import React from 'react';
import { render } from 'react-dom';
import { createGlobalStyle } from 'styled-components';

import { NotificationContainer } from 'react-notifications';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import FirebaseAuth from 'atoms/FirebaseAuth';
import ProtectedRoute from 'atoms/ProtectedRoute';

import Admin from 'pages/Admin';
import FourOhFour from 'pages/FourOhFour';
import Landing from 'pages/Landing';
import Player from 'pages/Player';
import QuizControl from 'pages/QuizControl';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }
`;

render(
  <>
    <GlobalStyle />
    <BrowserRouter>
      <FirebaseAuth>
        <Switch>
          <Route path="/error" render={() => <div>Something went wrong :(</div>} />
          <Route path="/404" component={FourOhFour} />
          <ProtectedRoute path="/admin/:id" component={QuizControl} redirectTo="/" />
          <ProtectedRoute path="/admin" component={Admin} redirectTo="/" />
          <Route path="/:quiz" render={(props) => <Player {...props} />} />
          <Route path="/" component={Landing} />
        </Switch>
      </FirebaseAuth>
    </BrowserRouter>
    <NotificationContainer />
  </>,
  document.getElementById('root')
);
