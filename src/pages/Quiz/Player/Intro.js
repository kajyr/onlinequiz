import React from 'react';
import Loader from 'atoms/Loader';
/**
 * Quiz client page
 */
const Intro = ({ user }) => {
  return (
    <>
      <p>
        Benvenuto {user.name}.<br />
        il quiz non è ancora iniziato, ma inizierà a breve.
      </p>
      <Loader />
    </>
  );
};

export default Intro;
