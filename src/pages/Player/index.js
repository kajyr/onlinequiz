import React from 'react';
import { Route, Switch } from 'react-router-dom';

import useDoc from 'hooks/useDoc';

import Loader from 'atoms/Loader';

import UserFacingPage from 'templates/UserFacingPage';

import Player from './Player';
import UserAuth from './UserAuth';
/**
 * Quiz client page
 */
const PlayerRouter = ({ match }) => {
  const { session } = match.params;
  const { data: sessionData, update } = useDoc('sessions', session);
  const { data: quizData } = useDoc('quizzes', sessionData ? sessionData.quizId : null);

  if (!quizData) {
    return (
      <UserFacingPage>
        <Loader />
      </UserFacingPage>
    );
  }

  return (
    <UserFacingPage>
      <h1>{quizData.title}</h1>
      <h2>SubNettuno Online Quiz</h2>
      <Switch>
        <Route
          path="/:session/:userName"
          render={(props) => (
            <Player {...props} quizData={quizData} session={sessionData} update={update} />
          )}
        />
        <Route path="/:session" render={(props) => <UserAuth {...props} sessionId={session} />} />
      </Switch>
    </UserFacingPage>
  );
};

export default PlayerRouter;
