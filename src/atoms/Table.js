import React from 'react';
import styled from 'styled-components';

export const TableElem = styled('table')`
  width: 100%;
  border-collapse: collapse;

  tr:hover td {
    background: #f6fafb;
  }

  td,
  th {
    padding: 1em 0;
  }

  th {
    text-align: left;
    font-weight: normal;
  }

  td {
    border-top: 1px solid #f4f4f4;
  }

  tr.fadeOut {
    transition: opacity 2s ease-in-out;
    opacity: 0;
  }
`;

export const Table = ({ headers, children, sortRequest }) => (
  <TableElem>
    {headers && (
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.id}>
              {header.sort ? (
                <Button onClick={() => sortRequest(header.sort)}>{header.content}</Button>
              ) : (
                header.content
              )}
            </th>
          ))}
        </tr>
      </thead>
    )}
    {children}
  </TableElem>
);

export const AzioniTd = styled.td`
  font-size: 0.9em;

  > * {
    margin-left: 0.5em;
  }
`;
