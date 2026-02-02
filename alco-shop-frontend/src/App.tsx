import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import CategoriesList from './components/CategoriesList';
import CategoryProducts from './components/CategoryProducts';
import CardMenuOrder from './components/СardMenuOrder';
import { AppDispatch, RootState } from './store/store';
import { checkAuth } from './store/authSlice';
import ProductDetail from './components/ProductDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WishList from './components/WishList';
import PrivateRoute from './components/PrivateRoutes';
import AdminPanel from './components/Admin/AdminPanel';
import AdminProductPanel from './components/Admin/AdminProductPanel';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Загрузка ...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <Routes>
          {!isAuth ? (
            <>
              <Route path="/login" element={<LoginForm />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<CategoriesList />} />
              <Route path="/category/:categoryName" element={<CategoryProducts />} />
              <Route path="/product/:productId" element={<ProductDetail />} />

              <Route path="/checkout" element={<CardMenuOrder />} />
              <Route path="/wish-list" element={<WishList />} />
              <Route
                path="/admin-panel"
                element={
                  <PrivateRoute>
                    <AdminPanel />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin-panel/products"
                element={
                  <PrivateRoute>
                    <AdminProductPanel />
                  </PrivateRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </div>
  );
}

export default App;
