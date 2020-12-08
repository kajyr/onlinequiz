import React, { useReducer } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

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
          <ListItem key={idx}>
            <TextField
              name={`question-${idx}`}
              label={`Domanda ${idx}`}
              type="text"
              value={q.text || ''}
              onChange={(e) => dispatch({ type: 'qedit', index: idx, text: e.target.value })}
              required
            />
            <Button variant="contained" onClick={(e) => dispatch({ type: 'qremove', index: idx })}>
              Rimuovi
            </Button>
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
