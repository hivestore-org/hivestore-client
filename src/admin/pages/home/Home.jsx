import React, { useEffect, useMemo, useState } from 'react'
import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import { Userdata } from '../../dummydata';
import "./home.css"
// import { userRequest } from '../../requestMethods';

export default function AdminHome() {

  const [userStats, setUserStats] = useState([]);

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

  useEffect(()=> {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.map(item =>
          setUserStats(prev => [
            ...prev,
            {name: MONTHS[item._id - 1], "Active User": item.total},
          ])
          );
      }catch(e) {}
    }
    getStats();
  }, [MONTHS]);

  return (
    <div className='home'>
         <Topbar />
         <div className="container">
          <Sidebar />
          <div className='main'>
            <FeaturedInfo />
            <Chart data={userStats} title="User Analytics" grid dataKey="Active User" />
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div> 
          </div>
         </div>
          
    </div>
  )
}
