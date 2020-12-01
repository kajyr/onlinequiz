import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from 'atoms/FirebaseAuth';

export default function ProtectedRoute(props) {
  const authValue = useContext(AuthContext);
  const { redirectTo, ...routeProps } = props;

  if (authValue.userDataPresent) {
    if (authValue.user == null) {
      return <Redirect to={redirectTo}></Redirect>;
    }
    return <Route {...routeProps} />;
  }

  return null;
}
