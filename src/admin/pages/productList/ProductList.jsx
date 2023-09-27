import "./productList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useDispatch, useSelector } from "react-redux";
// import { deleteProducts, getProducts } from "../../redux/apiCalls";

export default function AdminProductList() {
    // const [data, setData] = useState(productRows);
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);

    useEffect(() => {
        getProducts(dispatch)
    }, [dispatch])

    const handleDelete = id => {
        // setData(data.filter(item => item.id !== id));
        deleteProducts(id, dispatch);
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },
        { field: 'product', headerName: 'Product', width: 170, renderCell: params => {
            return (
                <div className="productList">
                    <img className="ProductImg" src={params.row.img} alt=''/>
                    {params.row.title}
                </div>
            )
        } },
        { field: 'inStock', headerName: 'Stock', width: 130 },
        {
            field: 'price',
            headerName: 'Price',
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: params => {
                return (
                    <>
                        <Link to ={`/product/${params.row._id}`}>
                        <button className="productEdit">Edit</button>
                        </Link>
                        <DeleteOutline className="productDelete" onClick={() => handleDelete(params.row._id)} />
                    </>
                    
                )
            }
        }
    ];

  return (
    <div className="productList">
        <Topbar />
        <div className="container">
            <Sidebar />
            <div className="main">
                <DataGrid rows={products} disableRowSelectionOnClick getRowId={(row) => row._id} columns={columns} autoPageSize={5} checkboxSelection />
            </div>
        </div>
    </div>
  )
}
