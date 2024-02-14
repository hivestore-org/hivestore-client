import { Badge } from '@mui/material';
import {
  ArrowForwardIos,
  ArrowForwardIosOutlined,
  Close,
  DensityMedium,
  Search,
  ShoppingBagOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { mobile, medium } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, reset } from '../redux/Authentication/authSlice';
// import { teal } from "@mui/material/colors";
// import { logout } from "../redux/userSlice";

const badgeStyle = {
  '& .MuiBadge-badge': {
    color: 'white',
    backgroundColor: '#757575',
  },
};

const fontStyle = {
  fontSize: 16,
  color: '#757575',
};

const Container = styled.div`
  padding: 0px 20px;
  height: 80px;
  font-family: 'Urbanist', sans-serif;
  border-bottom: 1px solid #f5f5f5;

  ${mobile({ height: '50px' })};
`;
const Wrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: '10px 0px' })};
`;

const MobileMenu = styled.div`
  position: absolute;
  width: ${(props) => (props.openMenu ? '320px' : '0px')};
  top: 0;
  right: 0;
  background: #fff;
  height: 100vh;
  z-index: 4;
  visibility: ${(props) => (props.openMenu ? 'visible' : 'hidden')};
  transition: width 0.25s;
`;

const Overlay = styled.div`
  opacity: ${(props) => (props.openMenu ? '1' : '0')};
  visibility: ${(props) => (props.openMenu ? 'visible' : 'hidden')};
  transition: opacity 0.8s ease, visibility 0s;
  background-color: hsla(0, 0%, 7%, 0.36);
  backdrop-filter: blur(4px);
  display: block;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
`;

const PrePanel = styled.div`
  padding: 60px 30px 150px 36px;
`;
const CloseBtn = styled.div`
  position: absolute;
  right: 14px;
  top: 8px;
  margin-right: 10px;
  cursor: pointer;
`;
const NavBtn = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 28px;
`;
const BtnText = styled.div`
  color: #757575;
  font-size: 24px;
`;

const MobileBtnCon = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MobileMenuBtn = styled.div`
  outline: none;
  border: 1px solid #111;
  font-size: 16px;
  background-color: transparent;
  cursor: pointer;
  margin-right: 8px;
  padding: 10px;
  width: 100px;
  text-align: center;
  border-radius: 25px;
  transition: ease 0.3s;
`;

const MobileCart = styled.div`
  margin-top: 40px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

// const Language = styled.span`
//     font-size: 14px;
//     cursor: pointer;
//     ${mobile({ display: "none" })};
// `;

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavList = styled.ul`
  display: flex;
  gap: 20px;

  ${medium({ display: 'none' })}
`;
const NavListItem = styled.li`
  list-style: none;
  font-size: 18px;
  font-weight: 500;
  font-family: 'Urbanist', sans-serif;
  color: #757575;
  cursor: pointer;
`;

const Logo = styled.h1`
  font-weight: bold;
  color: #757575;

  ${mobile({ fontSize: '24px' })};
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;
  text-decoration: none;
  background-color: transparent;
  border: 3px solid #f5f5f5;
  padding: 10px;
  width: 100px;
  text-align: center;
  font-size: 18px;
  border-radius: 25px;
  transition: ease 0.3s;

  &:hover {
    background: #757575;
    color: #fff;
  }

  ${medium({ display: 'none', marginLeft: '10px' })};
`;

const Cart = styled.div`
  cursor: pointer;
  margin-right: 25px;
  ${medium({ marginRight: '12px' })};
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #757575;
`;

const MenuIcon = styled.div`
  color: #757575;
  display: none;
  padding: 0px;
  margin: 0px;

  ${medium({ display: 'block' })};
`;

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  // const quantity = useSelector(state => state.cart.quantity);
  const { totalQuantity } = useSelector((state) => state.cart);
  
  const { user, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    return () => {
      dispatch(reset());
    };
  }, [error]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link
            style={{ textDecoration: 'none' }}
            to="/"
          >
            <Logo>HIVESTORE.</Logo>
          </Link>
        </Left>
        <Center>
          <NavList>
            <Link to="/product-list/men" style={{ textDecoration: "none" }}>
              <NavListItem>Men</NavListItem>
            </Link>
            <Link to="/product-list/women" style={{ textDecoration: "none" }}>
              <NavListItem>Women</NavListItem>
            </Link>
            <Link to="/product-list/accessories" style={{ textDecoration: "none" }}>
              <NavListItem>Accessories</NavListItem>
            </Link>
          </NavList>
        </Center>

        <Right>
          <Link to="/cart">
            <Cart>
              <Badge
                badgeContent={ totalQuantity }
                sx={badgeStyle}
              >
                <ShoppingBagOutlined
                  style={{ color: '#757575', width: '24px', height: '24px' }}
                />
              </Badge>
            </Cart>
          </Link>
          {user === null ? (
            <>
              <NavLink to="/register">
                <MenuItem>Join Us</MenuItem>
              </NavLink>
              <NavLink to="/login">
                <MenuItem>Sign In</MenuItem>
              </NavLink>
            </>
          ) : (
            <NavLink to="/">
              <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
            </NavLink>
          )}

          <MenuIcon
            onClick={() => {
              setOpenMenu(true);
            }}
          >
            <DensityMedium />
          </MenuIcon>
        </Right>
      </Wrapper>
      
      <MobileMenu openMenu={openMenu}>
        <PrePanel>
          <CloseBtn
            onClick={() => {
              setOpenMenu(false);
            }}
          >
            <Close style={{ fontSize: 28, color: '#757575' }} />
          </CloseBtn>
          <NavBtn>
            <BtnText>Men</BtnText>
            <ArrowForwardIos style={fontStyle} />
          </NavBtn>
          <NavBtn>
            <BtnText>Women</BtnText>
            <ArrowForwardIos style={fontStyle} />
          </NavBtn>
          <NavBtn>
            <BtnText>Accessories</BtnText>
            <ArrowForwardIos style={fontStyle} />
          </NavBtn>
          <MobileBtnCon>
          {user === null ? (
            <>
              <NavLink to="/register">
                <MobileMenuBtn>Join Us</MobileMenuBtn>
              </NavLink>
              <NavLink to="/login">
                <MobileMenuBtn>Sign In</MobileMenuBtn>
              </NavLink>
            </>
          ) : (
            <NavLink to="/">
              <MobileMenuBtn onClick={handleLogout}>LOGOUT</MobileMenuBtn>
            </NavLink>
          )}
          </MobileBtnCon>
          <MobileCart>
            <Badge
              badgeContent={totalQuantity}
              sx={badgeStyle}
            >
              <ShoppingBagOutlined
                style={{ color: '#757575', width: '24px', height: '24px' }}
              />
            </Badge>
          </MobileCart>
        </PrePanel>
      </MobileMenu>
      <Overlay
        openMenu={openMenu}
        onClick={() => {
          setOpenMenu(false);
        }}
      ></Overlay>
    </Container>
  );
}
