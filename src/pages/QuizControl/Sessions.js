import React from 'react';

import useCollection from 'hooks/useCollection';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Control from './Control';

const questionFormatter = (q) => (q === -1 ? 'Inizio' : q + 1);

const Sessions = ({ quizId, questionCount }) => {
  const { data, update } = useCollection('sessions', ['quizId', '==', quizId]);

  console.log('sessions', data);

  const prev = (id, q) => update(id, { question: q <= -1 ? -1 : q - 1 });
  const next = (id, q) =>
    update(id, { question: q >= questionCount - 1 ? questionCount - 1 : q + 1 });

  return (
    <div>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sessione</TableCell>
              <TableCell>Utenti</TableCell>
              <TableCell>Domanda attuale</TableCell>
              <TableCell>Controllo</TableCell>
              <TableCell align="right">Azioni</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((session) => {
              return (
                <TableRow key={session.id}>
                  <TableCell scope="row">{session.id}</TableCell>
                  <TableCell>{session.users.length}</TableCell>
                  <TableCell>{questionFormatter(session.question)}</TableCell>
                  <TableCell>
                    <Control
                      onPrev={
                        session.question <= -1 ? null : () => prev(session.id, session.question)
                      }
                      onNext={
                        session.question >= questionCount - 1
                          ? null
                          : () => next(session.id, session.question)
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="inherit" aria-label="Rimuovi sessione">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
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
