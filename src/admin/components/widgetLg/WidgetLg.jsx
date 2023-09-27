import React, { useEffect, useState } from 'react'
// import { userRequest } from '../../requestMethods';
import "./widgetLg.css";
import { format } from 'timeago.js';

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(()=>{
      const getOrders = async () => {
         try {
          const res = await userRequest.get("orders");
          setOrders(res.data);
         }catch(e) {

         }
      }
      getOrders();
  },[]);

  const Button = ({ type }) => {
    return <button className={`widgetLgButton ${type}`}>{type}</button>
  }

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Transaction</h3>
      <table className='widgetLgTable'>
        <thead>
        <tr className='widgetLgTr'>
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        </thead>
        <tbody>
        {orders.map(order => (
        <tr className="widgetLgTr" key={order._id}>
          <td className="widgetLgUser">
            {/* <img className='widgetLgImg' src="" alt="" /> */}
            <span className="widgetLgName">{order.userId}</span>
          </td>
          <td className="widgetLgDate">{order.createdAt}</td>
          <td className="widgetLgAmount">${order.amount}</td>
          <td className="widgetLgStatus">
            <Button type={format(order.status)}></Button>
          </td>
        </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}
 