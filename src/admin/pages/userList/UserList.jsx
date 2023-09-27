import "./userList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { userRows } from "../../dummydata";
import { Link } from "react-router-dom";
import { useState } from "react";
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';

export default function AdminUserList() {

    const [data, setData] = useState(userRows);

    const handleDelete = id => {
        setData(data.filter(item => item.id !== id));
    }

   const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'user', headerName: 'User', width: 130, renderCell: params => {
            return (
                <div className="useR">
                    <img className="userImg" src={params.row.avatar} alt=''/>
                    {params.row.username}
                </div>
            )
        } },
        { field: 'email', headerName: 'Email', width: 130 },
        {
            field: 'status',
            headerName: 'Status',
            width: 90,
        },
        {
            field: 'transaction',
            headerName: 'Transaction',
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: params => {
                return (
                    <>
                        <Link to ={`/user/${params.row.id}`}>
                        <button className="userEdit">Edit</button>
                        </Link>
                        <DeleteOutline className="userDelete" onClick={() => handleDelete(params.row.id)} />
                    </>
                    
                )
            }
        }
    ];

    return (
        <div className="userList">
            <Topbar />
            <div className="container">
                <Sidebar />
                <div className="main">
                <DataGrid rows={data} disableRowSelectionOnClick columns={columns} autoPageSize={5} checkboxSelection />
                </div>
            </div>
        </div>
    )
}