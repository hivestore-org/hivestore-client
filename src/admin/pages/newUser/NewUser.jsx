import './newUser.css'
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';

export default function AdminNewUser() {
  return (
    <div className='newUser'>
        <Topbar />
        <div className="container">
            <Sidebar />
            <div className="main">
            <h1 className="newUserTitle">New User</h1>
        <form className="newUserForm">
            <div className="newUserItem"> 
                <label htmlFor="username">Username</label>
                <input type="text" placeholder='John Smith' />
            </div>
            <div className="newUserItem">
                <label htmlFor="username">Fullname</label>
                <input type="text" name='username' placeholder='John Smith' />
            </div>
            <div className="newUserItem">
                <label htmlFor="email">Email</label>
                <input type="email" name='email' placeholder='email@gmail.com' />
            </div>
            <div className="newUserItem">
                <label htmlFor="password">Password</label>
                <input type="email" name='password' placeholder='password' />
            </div>
            <div className="newUserItem">
                <label htmlFor="phone">Phone</label>
                <input type="text" name='phone' placeholder='+234 4325 443' />
            </div>
            <div className="newUserItem">
                <label htmlFor="address">Address</label>
                <input type="text" name='address' placeholder='NY | USA' />
            </div>
            <div className="newUserItem">
                <label>Gender</label>
                <div className="newUserGender">
                    <input type="radio" name='gender' id='male' value='male' />
                    <label for='male'>Male</label>
                    <input type="radio" name='gender' id='male' value='male' />
                    <label for='female'>Female</label>
                    <input type="radio" name='gender' id='male' value='male' />
                    <label for='other'>Others</label>
                </div>
            </div>
            <div className="newUserItem">
                <label htmlFor="">Active</label>
                <select name="active" id="active" className="newUserSelect">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            <button className='newUserButton'>Create</button>
        </form>
            </div>
        </div>
        
    </div>
  )
}
