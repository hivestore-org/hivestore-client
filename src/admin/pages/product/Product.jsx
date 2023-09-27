import { Link, useLocation } from 'react-router-dom'
import Chart from '../../components/chart/Chart'
import './product.css';
//import { productData } from "../../dummydata";
import { Publish } from '@mui/icons-material';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
// import { userRequest } from '../../requestMethods';

export default function AdminProduct() {
    const location = useLocation();
    const productId = location.pathname.split('/')[2];
    const [pStats, setPStats] = useState([]);

    const product = useSelector(state => state.product.products.find(product => product._id === productId));

    const MONTHS = useMemo(
        () => [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        []
      );

      useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get(`orders/income?pId=${productId}`);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id;
                })
                list.map(item => 
                    setPStats(prev => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ]));
            }catch(e) {
                console.log(e);
            }
        }
        getStats();
      })
    

  return (
    <div className='product'>
        <Topbar />
        <div className="container">
            <Sidebar />
            <div className="main">
            <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>
            <Link to='/newProduct'>
                <button className="productAddButton">Create</button>
            </Link>
        </div>
        <div className="productTop">
            <div className="productTopLeft">
                <Chart data={pStats} dataKey='Sales' title='Sales Performance' />
            </div>
            <div className="productTopRight">
                <div className="productInfoTop">
                    <img className='productInfoImg' src={product.img} alt='' />
                    <span className="productName">{product.title}</span>
                </div>
                <div className="productInfoBottom">
                    <div className="productInfoItem">
                        <span className="productInfoKey">id:</span>
                        <span className="productInfoValue">{product._id}</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">sales:</span>
                        <span className="productInfoValue">1523</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">in stock:</span>
                        <span className="productInfoValue">{product.inStock}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="productBottom">
            <form action="" className="productForm">
                <div className="productFormLeft">
                    <label htmlFor="">Product Name</label>
                    <input type="text" placeholder={product.title} />
                    <label htmlFor="">Product Description</label>
                    <input type="text" placeholder={product.desc} />
                    <label htmlFor="">Product Price</label>
                    <input type="text" placeholder={product.price} />
                    <label htmlFor="">In Stock</label>
                    <select name="inStock" id="idStock">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div className="productFormRight">
                    <div className="productUpload">
                        <img className='productUploadImg' src={product.img} alt="" />
                        <label htmlFor="file">
                            <Publish />
                        </label>
                        <input type='file' id='file' style={{display: "none"}} />
                    </div>
                </div>
            </form>
        </div>
            </div>
        </div>
        
    </div>
  )
}
