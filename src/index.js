import React from 'react';
import { render } from 'react-dom';
import { NotificationContainer } from 'react-notifications';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

import Admin from 'pages/Admin';
import FourOhFour from 'pages/FourOhFour';
import Landing from 'pages/Landing';
import Quiz from 'pages/Quiz';
import QuizControl from 'pages/QuizControl';

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);

render(
  <>
    <BrowserRouter>
      <Switch>
        <Route path="/error" render={() => <div>Something went wrong :(</div>} />
        <Route path="/404" component={FourOhFour} />
        <Route path="/admin" component={Admin} />
        <Route path="/:quiz/manage" render={(props) => <QuizControl {...props} />} />
        <Route path="/:quiz" render={(props) => <Quiz {...props} />} />
        <Route path="/" component={Landing} />
      </Switch>
    </BrowserRouter>
    <NotificationContainer />
  </>,
  document.getElementById('root')
);
