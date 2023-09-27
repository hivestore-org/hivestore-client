import React from 'react';
import './topbar.css';
import { NotificationsNone, Language, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authentication/authSlice';

export default function Topbar() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

  return (
    <div className='topbar'>
        <div className='topbarWrapper'>
            <div className='topLeft'>
                <span className='logo'>GospelAdmin</span> 
            </div>
            <div className='topRight'>
                <div className='topbarIconContainer'>
                    <Link to="/admin/login">
                        <div className='menuItem' onClick={handleLogout}>LOGOUT</div>
                    </Link>
                </div>
                <div className='topbarIconContainer'>
                    <NotificationsNone />
                    <span className="topIconBadge">2</span>
                </div>
                <div className='topbarIconContainer'>
                    <Language />
                    <span className="topIconBadge">2</span>
                </div>
                <div className='topbarIconContainer'>
                    <Settings />
                </div>
                <img src="https://ibb.co/khSWw7p" alt="" className='topAvatar' />
            </div>
        </div>
    </div>
  )
}
