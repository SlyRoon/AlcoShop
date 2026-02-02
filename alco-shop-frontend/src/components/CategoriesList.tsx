import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/store';
import { logout } from '../store/authSlice';
import CategoryService from '../service/category/CategoryService';
import GetAllProductService from '../service/product/AllProductService';
import { ICategories } from '../models/category/ICategories';
import { ICategoryProducts } from '../models/category/ICategoryProducts';
import Cart from './CardMenu';
import { addItem } from '../store/itemSlice';
import { likeItems } from '../store/wishListSlice';
import { toast } from 'react-toastify';
import { ROLES } from '../utils/roles';

function CategoriesList() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [category, setCategory] = useState<ICategories[]>([]);
  const [products, setProducts] = useState<ICategoryProducts[]>([]);
  const [allProducts, setAllProducts] = useState<ICategoryProducts[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItems = useSelector((state: RootState) => state.items.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.amount, 0);

  const likedItems = useSelector((state: RootState) => state.like.items);
  const likeCount = likedItems.length;
  const role = useSelector((state: RootState) => state.auth.user.role);

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  async function getCategories() {
    try {
      const response = await CategoryService.fetchCategory();
      setCategory(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getProducts() {
    try {
      const response = await GetAllProductService.getAllProductService();
      setAllProducts(response.data);
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryName)) {
        return prev.filter((cat) => cat !== categoryName);
      } else {
        return [...prev, categoryName];
      }
    });
  };

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter((product) =>
        selectedCategories.some((catName) => {
          const cat = category.find((c) => c.Name === catName);
          return cat && product.CategoryId === cat.CategoryId;
        }),
      );
      setProducts(filtered);
    }
  }, [selectedCategories, allProducts, category]);

  const handleResetFilter = () => {
    setSelectedCategories([]);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-full px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">AlcoShop!</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/wish-list')}
                className="relative px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200 flex items-center gap-2"
              >
                <span>♡</span> Список бажань ({likeCount})
              </button>
              <button className="relative px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200 flex items-center gap-2">
                <span>⚖</span> Порівняння (0)
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200 flex items-center gap-2"
              >
                <span>🛒</span> Кошик ({cartCount})
              </button>
              {role === ROLES.ADMIN && (
                <button
                  onClick={() => navigate('/admin-panel')}
                  className="relative px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <span className="text-xl">⚙️</span>
                  Адмін Панель
                </button>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
              >
                Вийти
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen bg-gray-50 pt-0">
        <aside className="w-72 bg-white shadow-sm p-6 border-r border-gray-200 sticky top-20 h-screen overflow-y-auto z-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Категорії</h2>
          <nav className="space-y-2 mb-8">
            {category.map((cat) => (
              <button
                key={cat.Name}
                onClick={() => handleCategoryClick(cat.Name)}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition duration-200 ${
                  selectedCategories.includes(cat.Name)
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {cat.Name}
              </button>
            ))}
          </nav>
          {selectedCategories.length > 0 && (
            <>
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-semibold text-blue-900">Обрано: {selectedCategories.length}</p>
              </div>
              <button
                onClick={handleResetFilter}
                className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-200"
              >
                Скинути фільтр
              </button>
            </>
          )}
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {selectedCategories.length > 0 && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-lg font-semibold text-gray-900">
                  Обрані категорії: <span className="text-blue-600">{selectedCategories.join(', ')}</span>
                </p>
              </div>
            )}

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => {
                  const isLiked = likedItems.some((likedItem) => likedItem.ProductId === product.ProductId);

                  return (
                    <div
                      key={product.ProductId}
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition duration-300 flex flex-col group"
                    >
                      <div
                        className="relative bg-gray-100 h-80 flex items-center justify-center overflow-hidden cursor-pointer group/image w-full"
                        onClick={() => navigate(`/product/${product.ProductId}`)}
                      >
                        {product.ImagePath ? (
                          <img
                            src={`http://localhost:5000/images/${product.ImagePath}`}
                            alt={product.Name}
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full bg-gray-200">
                            <span className="text-gray-400">Нет фото</span>
                          </div>
                        )}

                        <div className="absolute top-3 right-3 flex gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => {
                              dispatch(likeItems(product));
                              toast.success('Товар додано у спискок бажань 🎉');
                            }}
                            className={`rounded-full p-2.5 shadow-md transition duration-200 text-base font-bold 
                                ${
                                  isLiked
                                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                    : 'bg-white text-gray-400 hover:text-red-400 hover:bg-red-50'
                                }`}
                          >
                            {isLiked ? '♥' : '♡'}
                          </button>
                          <button className="bg-white hover:bg-gray-100 rounded-full p-2.5 shadow-md transition duration-200 text-gray-400 hover:text-gray-700 text-base">
                            ⚖
                          </button>
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition duration-300 pointer-events-none"></div>
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <h3
                          className="font-bold text-base text-gray-900 line-clamp-2 mb-3 cursor-pointer hover:text-blue-600 transition h-12"
                          onClick={() => navigate(`/product/${product.ProductId}`)}
                        >
                          {product.Name}
                        </h3>

                        <div className="flex items-center gap-2 mb-3 h-7">
                          {renderStars(5)}
                          <span className="text-sm text-gray-500 font-medium">292</span>
                        </div>

                        <p className="text-gray-600 text-sm line-clamp-2 mb-4 h-10">{product.Description}</p>

                        <div className="mb-4 h-8">
                          <span className="text-xl font-bold text-red-600">{product.Price} ₴</span>
                        </div>

                        <div className="text-sm text-gray-600 space-y-2 mb-4 pb-4 border-b border-gray-200 h-16">
                          <p>
                            <span className="font-semibold">Крепість:</span> {product.AlcoholPercent}%
                          </p>
                          <p>
                            <span className="font-semibold">Об'єм:</span> {product.VolumeML} мл
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            dispatch(addItem(product));
                            toast.success('Товар додано у кошик! 🎉');
                          }}
                          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 text-base"
                        >
                          🛒 У кошик
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg">Товарів у цих категоріях не знайдено</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default CategoriesList;
