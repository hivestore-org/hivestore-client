import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userRequest } from "../admin/requestMethods";
import { Error } from "@mui/icons-material";

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: auto;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

export const CartSummary = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user);

  const checkout = async () => {

    if (!user) {
      navigate('/login')
    } else { 

      try {
        const products = JSON.parse(localStorage.getItem("cart"));
        
        const authTokens = localStorage.getItem('token');
        
        if (products && products.length > 0) {
          
          const response = await userRequest.post('/v1/cart', {
            products: products,
          }, {
            headers: {
                Authorization: `Bearer ${authTokens}`,
            }
        });
          if (!response) throw new Error("There is an error with the request")
          console.log(response, "or nothing")
      
          if (response.status === 200) {
            console.log("Products added to the database successfully.");
            const userId = user.user._id;
            const getResponse = await userRequest.get(`/v1/cart/${userId}`, {
              headers: {
                  Authorization: `Bearer ${authTokens}`,
              }
            });
            console.log(getResponse);
            const checkout = await userRequest.post('/v1/checkout', { getResponse }, {
              headers: {
                Authorization: `Bearer ${authTokens}`,
              }
            });
            if(!checkout) {
              throw new Error("There is an error with the request");
            } else {
              window.location = checkout.data.url;
              
            }
          } else {
            console.error("Server returned an error:", response.statusText)
          }
        } else {
          console.warn("No products found in the cart.")
        }
      } catch(error) {
        console.error("An error occurred while making the request:", error.message)
      }
    }
  };
  
    return (
        <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ 200</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText type="total">Total</SummaryItemText>
              <SummaryItemPrice>$ 100</SummaryItemPrice>
            </SummaryItem>
            {/* <StripeCheckout
                        name="Gospel Shop"
                        image=''
                        billingAddress
                        shippingAddress
                        description={`Your total is $${cart.total}`}
                        amount={cart.total * 100} //STRIPE WORKS WITH CENTS
                        token={onToken}
                        stripeKey={KEY}
                    > */}

            <Button onClick={checkout}>CHECKOUT NOW</Button>
            {/* </StripeCheckout> */}
          </Summary>
    )
}