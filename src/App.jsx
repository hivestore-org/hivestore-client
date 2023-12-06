import { Outlet, createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Product } from './pages/Product';
import { ProductList } from './pages/ProductList';
import { Register } from './pages/Register';
import AdminHome from '../src/admin/pages/home/Home';
import AdminLogin from '../src/admin/pages/login/Login';
import AdminNewProduct from '../src/admin/pages/newProduct/NewProduct';
import AdminNewUser from '../src/admin/pages/newUser/NewUser';
import AdminProduct from '../src/admin/pages/product/Product';
import AdminProductList from '../src/admin/pages/productList/ProductList';
import AdminUser from '../src/admin/pages/user/User';
import AdminUserList from '../src/admin/pages/userList/UserList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { logout } from './redux/Authentication/authSlice';
import { Success } from './pages/Success';

  

function App() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const currentTimeStamp = Math.floor(Date.now() / 1000);
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    if(currentTimeStamp && tokenExpiration > tokenExpiration) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');

      dispatch(logout());
    }
  }, [])

  const UnAuthLayout = () => {
    return (
      <div className="App">
        <Outlet />
      </div>
    );
  };

  const UserLayout = () => {
    return (
      <div className="App">
        <Outlet />
      </div>
    );
  };

  const AdminLayout = () => {

    const navigate = useNavigate();
    const isAdmin = useSelector(state => state.adminAuth.user);
    
    useEffect(() => {
      if(!isAdmin) {
        navigate('/admin/login')
      }
    }, [isAdmin, navigate])

    return (
      <div className="">
        <Outlet /> 
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <UnAuthLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/product/:id',
          element: <Product />,
        },
        {
          path: '/product-list/:category',
          element: <ProductList />,
        },
        {
          path: '/product-list',
          element: <ProductList />,
        },
        {
          path: '/cart',
          element: <Cart />,
        },
        {
          path: '/success',
          element: <Success />,
        },
      ],
    },
    {
      path: '/admin/',
      element: <AdminLayout />,
      children: [
        {
          path: '/admin/',
          element: <AdminHome />
        },
        {
          path: '/admin/login',
          element: <AdminLogin />
        },
        {
          path: '/admin/new-product',
          element: <AdminNewProduct />
        },
        {
          path: '/admin/new-user',
          element: <AdminNewUser />
        },
        {
          path: '/admin/product',
          element: <AdminProduct />
        },
        {
          path: '/admin/product-list',
          element: <AdminProductList />
        },
        {
          path: '/admin/user',
          element: <AdminUser />
        },
        {
          path: '/admin/user-list',
          element: <AdminUserList />
        }
      ]
    }

  ]);

  return <RouterProvider router={router} />;
}

export default App;
