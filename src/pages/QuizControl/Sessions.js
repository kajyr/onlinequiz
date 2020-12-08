import React from 'react';
import useCollection from 'hooks/useCollection';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const Sessions = ({ quizId }) => {
  const { data, add, remove } = useCollection('sessions', ['quizId', '==', quizId]);

  return (
    <div>
      <List>
        {data.map((session) => {
          return <ListItem key={session.id}>{session.id}</ListItem>;
        })}
      </List>
      <Button color="secondary" variant="contained">
        Aggiungi una sessione
      </Button>
    </div>
  );
};

export default Sessions;
