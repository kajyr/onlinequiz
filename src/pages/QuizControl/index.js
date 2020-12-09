import React from 'react';

import useDoc from 'hooks/useDoc';

import StaffFacingPage from 'templates/StaffFacingPage';
import QuizControlForm from './Form';
import Sessions from './Sessions';

import Panel, { PanelsRow } from 'atoms/Panel';

/**
 * Quiz control panel
 */
const QuizControl = ({ match }) => {
  const { id } = match.params;
  const { data, update } = useDoc('quizzes', id);

  console.log(data);

  if (!data) {
    // uh..
    return null;
  }

  const { questions = [] } = data;

  return (
    <StaffFacingPage title={`Quiz control: ${data.title}`} backLink="/admin">
      <PanelsRow>
        <Panel>control</Panel>

        <Panel>
          <Sessions quizId={id} />
        </Panel>
      </PanelsRow>

      <Panel>
        <QuizControlForm questions={questions} update={update} />
      </Panel>
    </StaffFacingPage>
  );
};

export default QuizControl;
