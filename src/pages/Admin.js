import React from 'react';
import withAuthUser from 'hocs/withAuthUser';
/**
 * Quizzes admin page
 */
const Admin = () => {
  return (
    <div>
      <h1>Quiz Admin</h1>
    </div>
  );
};

export default withAuthUser(Admin);
