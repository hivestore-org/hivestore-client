import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loginUser } from '../redux/Authentication/authActions';
import { mobile } from '../responsive';
import { useEffect } from 'react';
import { reset } from '../redux/Authentication/authSlice';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    url('https://i.ibb.co/4fgmSSB/avatar-g1b3afb5f3-1920.png') center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  padding: 30px;
  width: 25%;
  background: #ffffff;
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
  ${mobile({ width: '75%' })};
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const ErrorMessage = styled.span`
  color: red;
  margin-top: 10px;
  display: block;
`;

const Button = styled.button`
    border: none;
    width: 40%;
    padding 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled {
        color: green;
        cursor: not-allowed;
    }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const defaultFormFields = {
  email: '',
  password: '',
};

export const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [formError, setFormError] = useState({});
  const { user, error, success, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      handleError(message);
    }

    if (success && user) {
      navigate('/');
    }

    return () => {
      dispatch(reset());
    };
  }, [error, message, user, success, navigate]);

  const handleError = (message) => {
    const messageObj = JSON.parse(message);
    setFormError(messageObj);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formFields));
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="email"
            name="email"
            value={formFields.email}
            onChange={handleInputChange}
          />
          <ErrorMessage>{formError.email}</ErrorMessage>
          <Input
            type="password"
            placeholder="password"
            name="password"
            value={formFields.password}
            onChange={handleInputChange}
          />
          <ErrorMessage>{formError.password}</ErrorMessage>
          <Button type="submit">LOGIN</Button>
          {/* {error && <Error>Something went wrong!!!</Error>} */}
          <Link>FORGOT PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};
