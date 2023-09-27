import { Visibility } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
// import { userRequest } from '../../requestMethods';
import "./widgetSm.css";

export default function WidgetSm() {
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        const getUsers = async () => {
           try {
            const res = await userRequest.get("users/?new=true");
            setUsers(res.data);
           }catch(e) {

           }
        }
        getUsers();
    },[]);
  return (
    <div className='widgetSm'>
        <span className="widgetSmTitle">New Join Member</span>
        <ul className="widgetSmList">
            {users.map(user => (
            <li className="widgetSmListItem" key={user._id}>
                <img className='widgetSmImg' src={user.img || "https://www.flaticon.com/free-icons/user"} alt='userImage' />
                <div className="widgetSmUser">
                    <span className="widgetSmUsername">{user.username}</span>
                    {/* <span className="widgetUserTitle">Developer</span> */}
                </div>
                <button className='widgetSmButton'>
                    <Visibility className='widgetSmIcon' />
                    Display
                </button> 
            </li>
            ))}
        </ul>
    </div>
  )
}
