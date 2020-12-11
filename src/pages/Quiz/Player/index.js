import React, { useEffect } from 'react';
import Intro from './Intro';
/**
 * Quiz client page
 */
const Player = ({ match, session, quiz, update }) => {
  const { userName } = match.params;

  const user = session.users.find((u) => u.name === userName);
  // register user if it does not exists
  useEffect(() => {
    if (!user) {
      update({ ...session, users: session.users.concat({ name: userName }) });
    }
  }, [userName]);

  console.log(session, quiz);

  if (session.question === -1) {
    return <Intro user={user} />;
  }

  const question = quiz.questions[session.question];

  return (
    <>
      <h3> Domanda {session.question + 1}</h3>
      <p>{question.text}</p>
    </>
  );
};

export default Player;
