import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./user.css";
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';

export default function AdminUser() {
  return (
    <div className='user'>
        <Topbar />
        <div className="container">
            <Sidebar />
            <div className="main">
            <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
            <Link to='/newUser'>
                <button className="userAddButton">Create</button>
            </Link>
        </div>
        <div className="userContainer">
            <div className="userShow">
                <div className="userShowTop">
                    <img src="" alt="" className="userShowImg" />
                    <div className="userShowTopTitle">
                        <span className="userShowUsername">Gospel Amanze</span>
                        <span className="userShowUserTitle">Software Engineer</span>
                    </div>
                </div>
                <div className="userShowBottom">
                    <span className="userShowTitle">Account details</span>
                    <div className="userShowInfo">
                    <PermIdentity className="userShowIcon" />
                    <span className="userShowInfoTitle">gos2341</span>
                    </div>
                    <div className="userShowInfo">
                    <CalendarToday className="userShowIcon" />
                    <span className="userShowInfoTitle">14.03.2003</span>
                    </div>
                    <span className="userShowTitle">Account details</span>
                    <div className="userShowInfo">
                    <PhoneAndroid className="userShowIcon" />
                    <span className="userShowInfoTitle">+234 85 43 44</span>
                    </div>
                    <div className="userShowInfo">
                    <MailOutline className="userShowIcon" />
                    <span className="userShowInfoTitle">gos2341@gmail.com</span>
                    </div>
                    <div className="userShowInfo">
                    <LocationSearching className="userShowIcon" />
                    <span className="userShowInfoTitle">PH | Nigeria</span>
                    </div>
                </div>
            </div>
            <div className="userUpdate">
                <span className="userUpdateTitle">Edit</span>
                <form action="" className="userUpdateForm">
                    <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                            <label htmlFor="username">Username</label>
                            <input type="text" placeholder="gospel1234" name="username" className="userUpdateInput" />
                        </div>
                        <div className="userUpdateItem">
                            <label htmlFor="fullname">Full Name</label>
                            <input type="text" placeholder="Gospel Amanze" name="fullname" className="userUpdateInput" />
                        </div>
                        <div className="userUpdateItem">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="Amanze@gmail.com" name="email" className="userUpdateInput" />
                        </div>
                        <div className="userUpdateItem">
                            <label htmlFor="number">Phone Number</label>
                            <input type="text" placeholder="+234 234 543 43" name="number" className="userUpdateInput" />
                        </div>
                        <div className="userUpdateItem">
                            <label htmlFor="address">Address</label>
                            <input type="text" placeholder="NY | USA" name="address" className="userUpdateInput" />
                        </div>
                    </div>
                    <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                            <img src="" alt="" className="userUpdateImg" />
                            <label htmlFor="file"><Publish /></label>
                            <input type="file" id='file' name="file" style={{ display: "none" }} />
                        </div>
                        <button className="userUpdateButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
            </div>
        </div>
        
    </div>
  )
}
