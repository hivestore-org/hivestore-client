import { Add, Remove } from '@mui/icons-material';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { mobile } from '../responsive';
import { useDispatch } from 'react-redux';
import { addCartItem, increase, removeFromCart } from '../redux/Cart/cartSlice';
import { popularProducts } from '../data';
import { CartSummary } from '../components/CartSummary';
import { Link } from 'react-router-dom';
// import StripeCheckout from "react-stripe-checkout";
// import { userRequest } from '../requestMethods';

// const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: '10px' })};
`;

const EmptyWrapper = styled.div`
  
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Empty = styled.p`
  font-weight: 300;
  text-align: center;
  font-size: 20px;
  margin-top: 30px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.type === 'filled' && 'white'};
`;

const TopTexts = styled.div`
  ${mobile({ display: 'none' })};
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })};
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })};
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: '5px 15px' })};
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: '20px' })};
`;



const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

export const Cart = () => {
  const { cartItems, totalQuantity } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const items = cartItems.products;
  

  const incrementCartItem = (item) => {
    const existingItem = items.find(cartItem => cartItem._id === item._id);
    dispatch(increase({ ...item, quantity: existingItem.quantity + 1 }))
    // dispatch(addCartItem({ ...item, quantity: existingItem.quantity + 1 }));
  };

  const decrementCartItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };
  // const [stripeToken, setStripeToken] = useState(null);

  // const onToken = token => {
  //     setStripeToken(token);
  // }

  // console.log(stripeToken);
  // useEffect(() => {
  //     const makeRequest = async () => {
  //         try {
  //             const res = await userRequest.post("/checkout/payment", {
  //                 tokenId: stripeToken.id,
  //                 amount: cart.total * 100,
  //             });
  //             window.history.push("/success", { data: res.data })
  //         } catch {

  //         }
  //     }
  //     stripeToken && makeRequest();
  // }, [stripeToken, cart.total]);

  if (totalQuantity < 1) {
    return (
      <Container>
        <Navbar />
        <Announcement />
        <EmptyWrapper>
          <Title>YOUR BAG</Title>
          <Empty>is currently empty</Empty> 
        </EmptyWrapper>
        <Footer />
      </Container>
    )
  }
  
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/product-list/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag({totalQuantity})</TopText>
            <TopText>Your Whishlist(0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
          { items.map(item => (
                    <Product key={item._id}>
                        <ProductDetail>
                            <Image src={item.imgUrl} />
                            <Details>
                                <ProductName><b>Product:</b> {item.name} </ProductName>
                            <ProductId><b>ID:</b> {item._id}</ProductId>
                                <ProductColor color = {item.color}/>
                                <ProductSize><b>Size:</b> {item.size} </ProductSize>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>
                                <Add onClick={() => incrementCartItem(item)}/>   
                                <ProductAmount>{item.quantity}</ProductAmount> 
                                <Remove onClick={() => decrementCartItem(item._id)}/>
                            </ProductAmountContainer>
                            <ProductPrice>$ {item.price * item.quantity}</ProductPrice>
                        </PriceDetail>
                    </Product>
                    ))
            } 
          </Info>
          <CartSummary />
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};
