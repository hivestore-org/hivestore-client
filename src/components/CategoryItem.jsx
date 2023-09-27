import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 3px;
  height: 70vh;
  position: relative;
  ${mobile({ height: '40vh' })};
`;

const Overlay = styled.div`
  backdrop-filter: blur(2px);
  background-color: hsla(0, 0%, 7%, 0.36);
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: cover;
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;

  ${mobile({ fontSize: '25px' })}
`;
const Button = styled.button`
  padding: 16px 30px;
  outline: none;
  border: 1px solid #757575;
  font-size: 14px;
  font-weight: 500;
  color: #757575;
  background-color: #fff;
  cursor: pointer;
`;

export const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/product-list/${item.cat}`}>
      <Overlay></Overlay>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>SHOP NOW</Button>
      </Info>
      </Link>
    </Container>
  );
};
