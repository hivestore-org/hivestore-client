import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { loginUser } from '../redux/Authentication/authActions';
import { mobile, semiMedium } from '../responsive';
import { useEffect } from 'react';
import { reset } from '../redux/Authentication/authSlice';
import backgroundImg  from '../images/backgroundImg.jpg';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  ${semiMedium({ 
    background: `linear-gradient(
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.9)
  ), url('${backgroundImg}')`, 
    backgroundSize: '100%', 
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  
  })};
`;
const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
  ${semiMedium({padding: '20px', justifyContent: 'center', alignItems: 'center', boxShadow: 'none', height: 'auto', width: '400px', })};
  ${mobile({ width: '300px' })};
`;

const Banner = styled.div`
    background-image: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.9)
    ), url('${backgroundImg}');
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    background-size: 100%;
    background-position: center;

    flex: 1;

    ${semiMedium({ display: 'none' })};
`;

const WelcomeText = styled.h3`
    color: hsl(0, 0%, 100%);
    padding-left: 30px;
    letter-spacing: 10px;
    font-size: 30px;
    line-height: 3.5rem;
`;

const FormWrapper = styled.div`
    flex: 1;
    display: flex;
    background: #ffffff;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${semiMedium({ flex: '0' })};
`;
const FormContainer = styled.div`
    // border: 1px solid hsl(231, 11%, 63%);
    border-radius: 5px;
    padding: 20px;
    width: 350px;

    ${semiMedium({ 
      width: '300px'
     })};

     ${mobile({ width: '250px' })};
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;

  ${semiMedium({ fontSize: '22px' })};
`;
const Form = styled.form`
 
`;

const InputLabel = styled.label`
    letter-spacing: 1px;
    font-size: 14px;
`;

const Input = styled.input`
  flex: 1;
  width: 100%;
  margin: 10px 10px 8px 0px;
  padding: 15px;
  border: 1px solid hsl(231, 11%, 63%);
  border-radius: 5px;
  outline: none;

  ::placeholder {
    color: hsl(231, 11%, 63%);
  }

  &:focus {
    border-color: teal;
    border-width: 1px;
    color: teal;
  }

  ${semiMedium({ 
    padding: '10px',
   })};
`;

const ErrorMessage = styled.span`
  color: red;
  margin-bottom: 10px;
  display: block;
  font-size: 12px;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #FFFFFF;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  text-align: center;
  animation: ${spin} 1s linear infinite;
`;

const Button = styled.button`
    border: none;
    width: 100%;
    padding 15px 20px;
    background-color: teal;
    color: white;
    cursor: ${props => props.disable ? "pointer" : "not-allowed"};
    border-radius: 5px;
    opacity: ${props => props.disable ? "none" : "0.4"};
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

`;

const FormLink = styled.a`
  margin-top: 10px;
  font-size: 12px;
  cursor: pointer;
  display: block;

  &:hover {
    color: teal;
    font-weight: 500;
  }
`;


const defaultFormFields = {
  email: '',
  password: '',
};

export const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [formError, setFormError] = useState({});
  const { user, loading, error, success, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

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

  const validateInputs = () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    let errors = {};
  
    if (email === '') {
      errors = { ...errors, email: 'Your Email is Required' };
    }
  
    if (password === '') {
      errors = { ...errors, password: 'Your Password is Required' };
    }
  
    return errors;
  };

  const handleSignUp = () => {
    const errors = validateInputs();
    setFormError(errors);
    if(errors) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }

  };

  const handleError = (message) => {
    const messageObj = JSON.parse(message);
    setFormError(messageObj);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });

    if(value !== '') {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formFields));
  };

  return (
    <Container>
      <Wrapper>
            <Banner>
              <WelcomeText>Welcome Back!</WelcomeText>
            </Banner>
            <FormWrapper>
            <FormContainer>
              <Title>Sign In</Title>
              <Form onSubmit={handleSubmit}>
                <InputLabel htmlFor="email">Email <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 384 512"><path d="M192 32c17.7 0 32 14.3 32 32V199.5l111.5-66.9c15.2-9.1 34.8-4.2 43.9 11s4.2 34.8-11 43.9L254.2 256l114.3 68.6c15.2 9.1 20.1 28.7 11 43.9s-28.7 20.1-43.9 11L224 312.5V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V312.5L48.5 379.4c-15.2 9.1-34.8 4.2-43.9-11s-4.2-34.8 11-43.9L129.8 256 15.5 187.4c-15.2-9.1-20.1-28.7-11-43.9s28.7-20.1 43.9-11L160 199.5V64c0-17.7 14.3-32 32-32z" fill="red" /></svg></InputLabel>
                <Input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  id="email"
                  value={formFields.email}
                  onChange={handleInputChange}
                />
                <ErrorMessage>{formError.email}</ErrorMessage>

                <InputLabel htmlFor="password">Password <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 384 512"><path d="M192 32c17.7 0 32 14.3 32 32V199.5l111.5-66.9c15.2-9.1 34.8-4.2 43.9 11s4.2 34.8-11 43.9L254.2 256l114.3 68.6c15.2 9.1 20.1 28.7 11 43.9s-28.7 20.1-43.9 11L224 312.5V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V312.5L48.5 379.4c-15.2 9.1-34.8 4.2-43.9-11s-4.2-34.8 11-43.9L129.8 256 15.5 187.4c-15.2-9.1-20.1-28.7-11-43.9s28.7-20.1 43.9-11L160 199.5V64c0-17.7 14.3-32 32-32z" fill="red" /></svg></InputLabel>
                <Input
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  id="password"
                  value={formFields.password}
                  onChange={handleInputChange}
                />
                <ErrorMessage>{formError.password}</ErrorMessage>
                <Button onClick={handleSignUp} disabled = {!isChecked} disable = {isChecked} type="submit">
                  { loading ? <Loader /> : 'SIGN UP' }
                </Button>
                <FormLink>FORGOT PASSWORD?</FormLink>
                <Link style={{ textDecoration: 'none' }} to = {'/register'}><FormLink>CREATE A NEW ACCOUNT</FormLink></Link>
              </Form>
            </FormContainer>
            </FormWrapper>
      </Wrapper>
    </Container>
  );
};
