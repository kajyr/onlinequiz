import React from 'react';
import useForm from 'hooks/useForm';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
/**
 * Quiz client page
 */
const UserAuth = ({ sessionId, history }) => {
  const { inputs, handleSubmit, handleInputChange } = useForm({ name: '' }, (inputs) => {
    history.push(`/${sessionId}/${inputs.name}`);
  });
  return (
    <div>
      <p>
        Benvenuto.
        <br />
        Per iniziare il quiz inserisci qua i tuoi dati:
      </p>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Nome e cognome"
          type="text"
          value={inputs.name}
          onChange={handleInputChange}
        />
        <div>
          {inputs.name !== '' && (
            <Button color="primary" type="submit">
              Accedi
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserAuth;
