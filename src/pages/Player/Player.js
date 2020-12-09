import React, { useEffect } from 'react';
import Loader from 'atoms/Loader';
/**
 * Quiz client page
 */
const Player = ({ match, session, update }) => {
  const { userName } = match.params;

  const user = session.users.find((u) => u.name === userName);

  // register user if it does not exists
  useEffect(() => {
    if (!user) {
      update({ ...session, users: session.users.concat({ name: userName }) });
    }
  }, [userName]);

  return (
    <>
      <p>
        Benvenuto {userName}.<br />
        il quiz non è ancora iniziato, ma inizierà a breve.
      </p>
      <Loader />
    </>
  );
};

export default Player;
