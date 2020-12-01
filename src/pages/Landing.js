import React from 'react';
import firebase from 'firebase/app';
import useForm from 'hooks/useForm';
import UserFacingPage from 'templates/UserFacingPage';
import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

/**
 * Landing page
 */
const Landing = () => {
  const history = useHistory();
  const { handleSubmit, handleInputChange } = useForm({}, (inputs) => {
    const { email, password } = inputs;
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => firebase.auth().signInWithEmailAndPassword(email, password))
      .then((user) => {
        // Signed in
        // ...
        history.push('/admin');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('!!', errorCode, errorMessage);
      });
  });

  const handleSignIn = () => {};
  return (
    <UserFacingPage>
      <h1>Online Quiz platform</h1>

      <div>Accedi a un quiz</div>

      <div>
        oppure fai login:
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              name="email"
              label="Email"
              type="email"
              size="small"
              onChange={handleInputChange}
              required
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              size="small"
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
      </div>
    </UserFacingPage>
  );
};

export default Landing;
