// import "./app.css";
// import Home from "./pages/home/Home";
// import UserList from "./pages/userList/UserList";
// import User from "./pages/user/User";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NewUser from "./pages/newUser/NewUser";
// import ProductList from "./pages/productList/ProductList";
// import Product from "./pages/product/Product";
// import NewProduct from "./pages/newProduct/NewProduct";
// import Login from "./pages/login/Login";
// import { useSelector } from "react-redux";


// function App() {

//   // const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin;
//   // console.log(currentUser);
//   const admin = useSelector(state => state.auth.user);
//   console.log(admin);
  
//   return (
   
   
//     <Router>
     
//       <Routes> 
//          <Route path="/login" element={ <Login /> } />  
//         { admin && (
//         <>
//          <Route exact path="/" element={ <Home /> } />
//          <Route path="/users" element={ <UserList /> } />
//          <Route path="/user/:userId" element={ <User /> } />
//          <Route path="/newUser" element={ <NewUser /> } />
//          <Route path="/products" element={ <ProductList /> } />
//          <Route path="/product/:productId" element={ <Product /> } />
//          <Route path="/newProduct" element={ <NewProduct /> } /> 
//          </>
//          )} 
//       </Routes>
     
//     </Router>
//   );
// }

// export default App;
