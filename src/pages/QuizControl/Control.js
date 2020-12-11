import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';

const Control = ({ onNext, onPrev }) => {
  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="Domanda precedente"
        onClick={onPrev}
        disabled={!onPrev}>
        <ArrowBack />
      </IconButton>
      <IconButton
        color="inherit"
        aria-label="Domanda successiva"
        onClick={onNext}
        disabled={!onNext}>
        <ArrowForward />
      </IconButton>
    </div>
  );
};

export default Control;
