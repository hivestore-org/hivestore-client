import Announcement from './../components/Announcement';
import { Newsletter } from './../components/Newsletter';
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import styled from 'styled-components';
import { Add, Remove } from '@mui/icons-material';
import { mobile } from '../responsive';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { addCartItem } from '../redux/Cart/cartSlice';
import { addItemToCart } from '../redux/Cart/cartActions';

const Container = styled.div``;
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: '10px', flexDirection: 'column' })};
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;
  height: 60vh;
  ${mobile({ height: '40vh' })};
`;
const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 50px;
  ${mobile({ padding: '10px' })};
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: '100%' })};
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 5px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: '100%' })};
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

export const Product = () => {
  const user = useSelector(state => state.auth);
  console.log(user)
  const location = useLocation(); // returns an object that contains the pathname
  const id = location.pathname.split('/')[2];

  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  

  useEffect(() => {
      const getProduct = async () => {
          try {
              const res = await axios.get(`http://localhost:5000/api/v1/products/${id}`);
              setProduct(res.data.data.product);
              console.log(res.data.data.product)
          }catch(e) {
            console.log(e)
          }
      }
      getProduct();
  }, [id]);

  const handleQuantity = type => {
      if(type === "dec") {
         quantity > 1 && setQuantity(quantity - 1);
      }else {
          setQuantity(quantity + 1);
      }
  }

  const addToCart = () => {
    console.log("clicked!!!")
    if (user) {
      dispatch(addItemToCart({ 
        product: {
          product: id,
          quantity,
          title: product.title,
          price: product.price,
          imgUrl: product.image,
          size: product.size,
          color: product.color,
        }
      }));
    } else {
      dispatch(addCartItem({
        name: product.title,
        id,
        price: product.price,
        imgUrl: product.image,
        size: product.size,
        color: product.color,
        quantity
      }));
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={`http://localhost:5000/img/products/${product.image}`} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.description}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {/* {product.color?.map(color => (
                        <FilterColor color={color} key={color} onClick={() => setColor(color)} />
                        ))} */}
              <FilterColor color={product.color} />
              {/* <FilterColor color="gray" /> */}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                {/* {product.size?.map(size => (
                            <FilterSizeOption key={size}>{size}</FilterSizeOption>
                            ))} */}
                <FilterSizeOption>{product.size}</FilterSizeOption>
                {/* <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption> */}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity('dec')}/>
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity('inc')}/>
            </AmountContainer>
            <Button onClick={addToCart}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};
