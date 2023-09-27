import React from 'react';
import styled from 'styled-components';
import { CategoryItem } from './CategoryItem';
import { categories } from '../data';
import { mobile } from '../responsive';

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: center;
  align-items: center;
  ${mobile({ padding: '0px', flexDirection: 'column' })};
`;

const Heading = styled.h1`
  color: #393d46;
  font-size: 60px;
  padding: 40px 20px;

  ${mobile({ fontSize: '40px', paddingBottom: '10px' })}
`;

export const Categories = () => {
  return (
    <>
      <Heading>Our Categories</Heading>
      <Container>
        {categories.map((item) => (
          <CategoryItem
            item={item}
            key={item.id}
          />
        ))}
      </Container>
    </>
  );
};
