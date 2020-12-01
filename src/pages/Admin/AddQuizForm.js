import React, { useState } from 'react';
import useForm from 'hooks/useForm';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'baseline',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

/**
 * Quizzes admin page
 */
const AddQuizForm = ({ onAdd }) => {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { inputs, handleSubmit, handleInputChange, reset } = useForm({}, (inputs) => {
    onAdd(inputs);
    reset();
    handleClose();
  });
  return (
    <>
      <Button onClick={handleClickOpen}>Aggiungi</Button>
      <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Aggiungi un nuovo quiz</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Per aggiungere un nuovo quiz specifica il titolo del quiz e la parola chiave per
            l'accesso
          </DialogContentText>
          <form
            id="add-quiz-form"
            onSubmit={handleSubmit}
            className={classes.root}
            autoComplete="off">
            <TextField
              autoFocus
              name="title"
              label="Title"
              type="text"
              fullWidth
              value={inputs.title || ''}
              onChange={handleInputChange}
            />
            <TextField
              name="key"
              label="Chiave di accesso"
              type="text"
              fullWidth
              value={inputs.key || ''}
              onChange={handleInputChange}
            />
            <Button>Aggiungi</Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annulla
          </Button>
          <Button color="primary" type="submit" form="add-quiz-form">
            Aggiungi
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddQuizForm;
