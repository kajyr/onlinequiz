import React from 'react';
import useCollection from 'hooks/useCollection';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const Sessions = ({ quizId }) => {
  const { data, add, remove } = useCollection('sessions', ['quizId', '==', quizId]);

  return (
    <div>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sessione</TableCell>
              <TableCell>Utenti</TableCell>
              <TableCell>Domanda attuale</TableCell>
              <TableCell align="right">Azioni</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((session) => (
              <TableRow key={session.id}>
                <TableCell scope="row">
                  <Link href={`/admin/${quizId}/${session.id}`}>{session.id}</Link>
                </TableCell>
                <TableCell>{session.users.length}</TableCell>
                <TableCell>{session.question}</TableCell>
                <TableCell align="right">
                  <Button>Elimina</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button color="secondary" variant="contained">
        Aggiungi una sessione
      </Button>
    </div>
  );
};

export default Sessions;
