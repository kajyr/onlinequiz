import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  listItem: {
    display: 'flex',
  },
  input: {
    flex: '1',
  },
}));

function reducer(state, { type, ...payload }) {
  switch (type) {
    case 'qedit':
      return state.map((q, index) => (index !== payload.index ? q : { ...q, text: payload.text }));
    case 'qremove':
      return state.filter((_, index) => index !== payload.index);
    default:
      throw new Error();
  }
}

/**
 * Quiz control panel
 */
const QuizControlForm = ({ questions = [], update }) => {
  const [state, dispatch] = useReducer(reducer, questions);
  const classes = useStyles();

  const add = () => {
    update({ questions: questions.concat({ text: '' }) });
  };

  const save = () => {
    update({ questions: state });
  };

  return (
    <form>
      Domande:
      <List>
        {state.map((q, idx) => (
          <ListItem key={idx} className={classes.listItem}>
            <TextField
              name={`question-${idx}`}
              label={`Domanda ${idx}`}
              className={classes.input}
              type="text"
              value={q.text || ''}
              onChange={(e) => dispatch({ type: 'qedit', index: idx, text: e.target.value })}
              required
            />
            <IconButton
              color="inherit"
              aria-label="Rimuovi domanda"
              onClick={(e) => dispatch({ type: 'qremove', index: idx })}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <div>
        <Button color="secondary" variant="contained" onClick={add}>
          Aggiungi domanda
        </Button>
        <Button color="primary" variant="contained" onClick={save}>
          Salva
        </Button>
      </div>
    </form>
  );
};

export default QuizControlForm;
