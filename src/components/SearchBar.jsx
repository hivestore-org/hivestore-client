import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { Search } from '@mui/icons-material';

const Container = styled.div`
  margin: 10px 0px;
  display: flex;
  justify-content: center;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
  width: 600px;
  border-radius: 25px;
  background-color: #f5f5f5;
  padding-right: 8px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding: 10px 10px 10px 16px;
  border-radius: 25px;
  background-color: #f5f5f5;
  width: 100%;
  font-size: 16px;
  font-family: 'Urbanist', sans-serif;
  &::placeholder {
    font-size: 16px;
    font-family: 'Urbanist', sans-serif;
    opacity: 0.7;
  }

  ${mobile({ width: '15px' })};
`;

export default function SearchBar() {
  return (
    <Container>
      <SearchContainer>
        <Input placeholder="Search" />
        <Search style={{ color: 'gray', fontSize: 24 }} />
      </SearchContainer>
    </Container>
  );
}
