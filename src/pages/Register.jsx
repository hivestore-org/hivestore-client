import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
// import setToken from './../utils/token';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/Authentication/authActions';
import { reset } from '../redux/Authentication/authSlice';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    url('https://i.ibb.co/4fgmSSB/avatar-g1b3afb5f3-1920.png') center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  padding: 30px;
  width: 40%;
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
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const ErrorMessage = styled.span`
  color: red;
  margin-top: 10px;
  display: block;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
    border: none;
    width: 40%;
    padding 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`;

const defaultFormFields = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const Register = () => {
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
    //   alert(message);
    const messageObj = JSON.parse(message);
    setFormError(messageObj);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formFields));
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="fullname"
            name="fullName"
            value={formFields.fullName}
            onChange={handleInputChange}
          />
          <ErrorMessage>{formError.fullName}</ErrorMessage>
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
          <Input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            value={formFields.confirmPassword}
            onChange={handleInputChange}
          />
          <ErrorMessage>{formError.confirmPassword}</ErrorMessage>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};
