import React, { useState } from 'react';
import styled from 'styled-components';

export const PanelW = styled.div`
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.125), 0 1px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;

  position: relative;
  display: flex;
  flex-direction: column;

  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
`;

const Header = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.75rem 1.25rem;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  display: flex;
`;

const Title = styled.div``;

const Actions = styled.div`
  margin-left: auto;

  > * {
    margin-left: 0.5em;
  }
`;

const Body = styled.div`
  flex: 1 1 auto;
  padding: 1.25rem;
`;

export const Panel = ({ header, actions, foldable, children, ...other }) => {
  const hasHeaderLine = !!header || !!actions;
  const [isOpen, setOpen] = useState(true);

  return (
    <PanelW {...other}>
      {hasHeaderLine && (
        <Header onClick={() => foldable && setOpen(!isOpen)}>
          {header && <Title>{header}</Title>}
          {actions && <Actions>{actions}</Actions>}
        </Header>
      )}
      {isOpen && <Body>{children}</Body>}
    </PanelW>
  );
};

export const PanelsRow = styled.div`
  display: flex;

  > ${PanelW} {
    flex: 1 1 0;
  }

  ${PanelW} + ${PanelW} {
    margin-left: 15px;
  }
`;

export default Panel;
