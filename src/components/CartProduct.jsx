import { Add, Remove } from '@mui/icons-material';
import styled from "styled-components";
import { mobile } from "../responsive";

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


export const CartProduct = ({ cartItems, cartIncrement, cartDecrement }) => {
  console.log(cartItems)
    return (
        <>
            { cartItems.map(item => (
                    <Product key={item.id}>
                        <ProductDetail>
                            <Image src={`${import.meta.env.VITE_API_DOMAIN}/img/products/${item.imgUrl}`} />
                            <Details>
                                <ProductName><b>Product:</b> {item.name} </ProductName>
                            <ProductId><b>ID:</b> {item.id}</ProductId>
                                <ProductColor color = {item.color}/>
                                <ProductSize><b>Size:</b> {item.size} </ProductSize>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>
                                <Add onClick={() => cartIncrement(item)}/>   
                                <ProductAmount>{item.quantity}</ProductAmount> 
                                <Remove onClick={() => cartDecrement(item.id)}/>
                            </ProductAmountContainer>
                            <ProductPrice>$ {item.price * item.quantity}</ProductPrice>
                        </PriceDetail>
                    </Product>
                    ))
            } 
            
        </>
    )
}
