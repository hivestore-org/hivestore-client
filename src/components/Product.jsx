import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { addCartItem } from "../redux/Cart/cartSlice"

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 4;
  transition: all 0.5s ease;
`;

const Container = styled.div`
  background-color: #f5fbfd;
  width: 370px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Wrap = styled.div`
  position: relative;
  overflow: hidden;
`;

const RedLabel = styled.div`
  height: 100px;
  width: 200px;
  background: red;
  position: absolute;
  left: -100px;
  top: -50px;
  right: auto;
  margin: 0;
  padding: 0;
  transform: rotate(-45deg);
  z-index: 1;
`;

// const Circle = styled.div`
//     width: 300px;
//     height: 300px;
//     border-radius: 50%;
//     position: absolute;
//     background-color: white;

// `;
const Image = styled.img`
  height: 300px;
  width: 300px;
  border-radius: 50%;
  object-fit: cover;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Product = ({ item }) => {
  // console.log(item)
  const dispatch = useDispatch();
  const addToCart = () => {
      dispatch(addCartItem({
          name: item.title,
          id: item._id,
          price: item.price,
          imgUrl: item.image,
          size: item.size,
          color: item.color,
        })
      );
  };
  return (
    <Container>
      {/* <Circle/> */}
      <Wrap>
        <RedLabel />
        <Image src={`http://localhost:5000/img/products/${item.image}`} />
        <Info>
          <Icon onClick={addToCart}>
            <ShoppingCartOutlined />
          </Icon>
          <Icon>
            <Link to={`/product/${item._id}`}>
              <SearchOutlined />
            </Link>
          </Icon>
          <Icon>
            <FavoriteBorderOutlined />
          </Icon>
        </Info>
      </Wrap>
    </Container>
  );
};
