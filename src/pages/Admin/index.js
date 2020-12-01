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

import StaffFacingPage from 'templates/StaffFacingPage';

import AddQuizForm from './AddQuizForm';

/**
 * Quizzes admin page
 */
const Admin = () => {
  const { data: rows, add, remove } = useCollection('quizzes');

  function confirmRemove(quiz) {
    const response = confirm(`Cancellare "${quiz.title}" ?`);
    if (response) {
      remove(quiz.id);
    }
  }
  console.log(rows);
  return (
    <StaffFacingPage title="Quiz Admin">
      <AddQuizForm onAdd={add} />
      {rows.length > 0 && (
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Titolo</TableCell>
                <TableCell>Chiave di accesso</TableCell>
                <TableCell align="right">Azioni</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell scope="row">{quiz.title}</TableCell>
                  <TableCell scope="row">
                    <Link href={`/admin/${quiz.id}`}>{quiz.key}</Link>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => {
                        confirmRemove(quiz);
                      }}>
                      Elimina
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </StaffFacingPage>
  );
};

export default Admin;
