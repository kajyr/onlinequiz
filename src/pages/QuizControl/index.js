import React from 'react';

import useDoc from 'hooks/useDoc';

import Button from '@material-ui/core/Button';

import StaffFacingPage from 'templates/StaffFacingPage';

/**
 * Quiz control panel
 */
const QuizControl = ({ match }) => {
  const { id } = match.params;

  const { data, update } = useDoc('quizzes', id);

  console.log(data);

  const add = () => {
    update({ questions: (data.questions || []).concat({ text: ' ' }) });
  };

  if (!data) {
    // uh..
    return null;
  }

  const { questions = [] } = data;

  return (
    <StaffFacingPage title={`Quiz control: ${data.title}`} backLink="/admin">
      Elenco domande:
      <ol>
        {questions.map((q, idx) => (
          <li key={idx}>{q.text}</li>
        ))}
      </ol>
      <div>
        <Button color="primary" variant="contained" onClick={add}>
          Aggiungi domanda
        </Button>
      </div>
    </StaffFacingPage>
  );
};

export default QuizControl;
