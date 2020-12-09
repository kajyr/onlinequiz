import React from 'react';
import styled from 'styled-components';
import SpinnerLoader from 'react-loader-spinner';

const Container = styled.div`
  text-align: center;
`;

const Loader = () => (
  <Container>
    <SpinnerLoader type="ThreeDots" color="#00BFFF" height={100} width={100} />
  </Container>
);

export default Loader;
