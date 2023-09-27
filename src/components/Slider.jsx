import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { sliderItems } from '../data';
import { medium, mobile } from '../responsive';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  display: flex;
  color: #757575;
  font-family: 'Poppins', sans-serif;
  position: relative;
  overflow: hidden;

  ${mobile({ overflowY: 'visible' })};
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === 'left' && '10px'};
  right: ${(props) => props.direction === 'right' && '10px'};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  display: flex;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  transition: transform 1.5s ease;
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};

  ${mobile({ height: 'auto', flexDirection: 'column', paddingTop: '20px' })}
`;

const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mobile({ height: '50%', display: 'block' })}
`;

const Image = styled.img`
  height: 80%;

  ${mobile({ maxWidth: '100%', height: 'auto', display: 'block' })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  ${mobile({ padding: '20px' })}
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 400;
  margin-bottom: 20px;

  ${mobile({ fontSize: '40px' })}
`;

const Desc = styled.p`
  margin-bottom: 50px;
  font-size: 17px;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 3px;

  ${mobile({ fontSize: '14px' })}
`;
const Button = styled.button`
  padding: 16px 62px 16px 62px;
  outline: none;
  border: 1px solid #757575;
  font-size: 14px;
  font-weight: 500;
  color: #757575;
  background-color: transparent;
  cursor: pointer;

  ${medium({ padding: '16px 30px 16px 30px' })}
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow
        direction="left"
        onClick={() => handleClick('left')}
      >
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide
            bg={item.bg}
            key={item.id}
          >
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Link to="/product-list/">
                <Button>SHOP NOW</Button>
              </Link>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow
        direction="right"
        onClick={() => handleClick('right')}
      >
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
