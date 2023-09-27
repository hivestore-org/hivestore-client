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
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

  

function App() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);
  const anonymousCart = JSON.parse(localStorage.getItem('cart'));
  console.log(anonymousCart)
  const user = useSelector(state => state.auth.user);
  console.log(user);
  useEffect(() => {
    if(user) {
      if(cartItems) {
        const mergeCarts = async () => {
          let authTokens = localStorage.getItem("token");
          try {
            const response = await axios.post(`http://localhost:5000/api/v1/cart/`, cartItems, {
              headers: {
                Authorization: `Bearer ${authTokens}`
              }
            });
            return response.data;
          } catch (e){
            console.log(e);
          }
        }
        mergeCarts();
      }
    }
  }, [user]);
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
    
    useEffect(()=> {
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
          element: <adminUser />
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
