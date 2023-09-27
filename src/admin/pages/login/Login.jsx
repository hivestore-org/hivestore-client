import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset } from '../../redux/authentication/authSlice';
import { loginAdmin } from '../../redux/authentication/authActions';

const defaultFormFields = {
  email: '',
  password: ''
}

export default function AdminLogin() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    // const [formError, setFormError] = useState({});
    const { user, error, success, message } = useSelector(state => state.adminAuth)
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    useEffect(() => {
      if (success && user) {
        navigate('/admin');
      }

      return () => {
        dispatch(reset());
      }
    }, [user, success, dispatch])

    const handleInputChange = e => {
      const { name, value } = e.target;
      setFormFields({...formFields, [name]: value});
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(loginAdmin(formFields));
    }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}> 
          <input style={{padding: 10, marginBottom: 20}} type="email" name='email' value={formFields.email} placeholder="username" onChange={handleInputChange} />
          <input style={{padding: 10, marginBottom: 20}} type="password" value={formFields.password} name='password' placeholder="password" onChange={handleInputChange} />
          <button style={{padding: 10, width: 90}} type='submit'>Login</button>
      </div>
    </form>
  )
}
