import React from 'react';
import firebase from 'firebase/app';
import { Redirect } from 'react-router-dom';

const withAuthUser = (Component) => {
  const HoC = (props) => {
    const user = firebase.auth().currentUser;

    if (!user) {
      return <Redirect to="/" />;
    }

    return <Component user={user} {...props} />;
  };

  return HoC;
};

export default withAuthUser;
