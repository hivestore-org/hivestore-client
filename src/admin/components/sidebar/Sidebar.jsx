import React from 'react';
import { AttachMoney, ChatBubbleOutline, DynamicFeed, BarChart, LineStyle, MailOutline, PermIdentity, Report, Storefront, Timeline, TrendingUp, WorkOutline } from '@mui/icons-material';
import "./sidebar.css";
import { Link } from 'react-router-dom';

export default function sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Dashboard</h3>
                <ul className="sidebarList">
                    <Link to='/'>
                        <li className="active sidebarListItem">
                            <LineStyle className='sidebarIcon' />
                            Home
                        </li>
                    </Link>
                    <li className="sidebarListItem">
                        <Timeline className='sidebarIcon' />
                        Analytics
                    </li>
                    <li className="sidebarListItem">
                        <TrendingUp className='sidebarIcon' />
                        Sales
                    </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Quick Menu</h3>
                <ul className="sidebarList">
                    <Link to ='/users' className='link'>
                        <li className="active sidebarListItem">
                            <PermIdentity className='sidebarIcon' />
                            Users
                        </li>
                    </Link>
                    <Link to='/products' className='link'>
                        <li className="sidebarListItem">
                            <Storefront className='sidebarIcon' />
                            Products
                        </li>
                    </Link>
                    <li className="sidebarListItem">
                        <AttachMoney className='sidebarIcon' />
                        Transactions
                    </li>
                    <li className="sidebarListItem">
                        <BarChart className='sidebarIcon' />
                        Reports
                    </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Notifications</h3>
                <ul className="sidebarList">
                   <Link to='/'>
                   <li className="active sidebarListItem">
                        <MailOutline className='sidebarIcon' />
                        Home
                    </li>
                   </Link>
                    <li className="sidebarListItem">
                        <DynamicFeed className='sidebarIcon' />
                        Analytics
                    </li>
                    <li className="sidebarListItem">
                        <ChatBubbleOutline className='sidebarIcon' />
                        Sales
                    </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Staff</h3>
                <ul className="sidebarList">
                    <li className="active sidebarListItem">
                        <WorkOutline className='sidebarIcon' />
                        Home
                    </li>
                    <li className="sidebarListItem">
                        <Timeline className='sidebarIcon' />
                        Analytics
                    </li>
                    <li className="sidebarListItem">
                        <Report className='sidebarIcon' />
                        Sales
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
