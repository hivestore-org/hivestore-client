import React from 'react';
import styled from 'styled-components';
import icon1 from './../images/icon1.png';
import icon2 from './../images/icon2.png';
import icon3 from './../images/icon3.png';
import { medium } from '../responsive';

const Container = styled.section`
  background-color: #393d46;
  padding: 0px 90px 20px 90px;
  margin-top: 40px;

  ${medium({ padding: '0px 20px 20px 20px' })}
`;
const Heading = styled.h1`
  padding: 120px 0px 50px 0px;
  font-size: 60px;
  font-weight: 500;
  color: #fff;

  ${medium({ fontSize: '40px', padding: '60px 0px 50px 0px' })}
`;
const BoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Box = styled.div`
  padding: 50px 40px 50px 40px;
  background-color: #fff;
  margin-bottom: 10px;
  margin-right: 10px;
  width: 300px;

  ${medium({ width: '100%' })}
`;
// const HeaderImg = styled.img.attrs({
//     src: `${logo}`
//   })`
//   width: 50px;
//   height: 30px;
//   `;
const BoxImage = styled.img``;
const BoxHeading = styled.h3`
  font-size: 24px;
  color: #393d46;
  margin-bottom: 10px;
`;
const BoxParagraph = styled.p`
  font-size: 15px;
  line-height: 1.8em;
  font-family: 'Poppins', sans-serif;
`;
const BoxButton = styled.button`
  outline: none;
  border: 1px solid #393d46;
  cursor: pointer;
  padding: 8px;
  font-family: 'Poppins', sans-serif;
  margin-top: 10px;
  background: transparent;
  &:hover {
    color: white;
    background: #393d46;
  }
`;

export default function StayInTrend() {
  return (
    <Container>
      <Heading>Stay in Trend with HiveWears</Heading>
      <BoxContainer>
        <Box>
          <BoxImage
            src={icon1}
            alt="icon"
          />
          <BoxHeading>Latest Styles</BoxHeading>
          <BoxParagraph>
            Our designs follow the latest fashion styles to help you stay
            updated with new trends.
          </BoxParagraph>
          {/* <BoxButton>Read More</BoxButton> */}
        </Box>
        <Box>
          <BoxImage
            src={icon2}
            alt="icon"
          />
          <BoxHeading>Fresh Fashion Trends</BoxHeading>
          <BoxParagraph>
          Stay ahead of the curve with our fashion-forward designs, 
          crafted to embody the latest trends and styles.
          </BoxParagraph>
          {/* <BoxButton>Read More</BoxButton> */}
        </Box>
        <Box>
          <BoxImage
            src={icon3}
            alt="icon"
          />
          <BoxHeading>Trendsetting Designs</BoxHeading>
          <BoxParagraph>
          Explore our collection to elevate your wardrobe and make a statement wherever you go.
          </BoxParagraph>
          {/* <BoxButton>Read More</BoxButton> */}
        </Box>
      </BoxContainer>
    </Container>
  );
}
