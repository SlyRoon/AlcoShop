import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { addItem } from '../store/itemSlice';
import { removeLikeItem } from '../store/wishListSlice';
import { useState } from 'react';
import Cart from './CardMenu';
import { toast } from 'react-toastify';

function WishList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const itemCard = useSelector((state: RootState) => state.items.items);
  const cartCount = itemCard.reduce((sum, item) => sum + item.amount, 0);

  const likedItems = useSelector((state: RootState) => state.like.items);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-full px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">AlcoShop!</h1>
            <div className="flex items-center gap-4">
              <button className="relative px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200 flex items-center gap-2">
                <span>♡</span> Список бажань ({likedItems.length})
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
              <button
                onClick={() => navigate('/')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition"
              >
                ← Назад
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Список бажань</h1>
   
        <p className="text-gray-600 mb-8">Кількість товарів: {likedItems.length}</p>

        <div className="flex justify-between items-center mb-8">
          <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition">
            Купити все
          </button>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option>За датою додавання</option>
            <option>Ціна: від низької до високої</option>
            <option>Ціна: від високої до низької</option>
          </select>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {likedItems.length > 0 ? (
            likedItems.map((item) => (
              <div
                key={item.ProductId}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition duration-300 flex flex-col group"
                 
              >
                <div className="relative bg-gray-100 h-80 flex items-center justify-center overflow-hidden cursor-pointer group/image w-full">
                  <img
                    onClick={() => navigate(`/product/${item.ProductId}`)}
                    src={`http://localhost:5000/images/${item.ImagePath}`}
                    alt={item.Name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />

                  <div className="absolute top-3 right-3 flex gap-2" onClick={(e) => e.stopPropagation()}>
             
                    <button
                      onClick={() => dispatch(removeLikeItem(item.ProductId))}
                      className="bg-red-50 text-red-600 hover:bg-red-100 rounded-full p-2.5 shadow-md transition duration-200 text-base font-bold"
                    >
                        ♥
                    </button>
                    <button className="bg-white hover:bg-gray-100 rounded-full p-2.5 shadow-md transition duration-200 text-gray-400 hover:text-gray-700 text-base">
                      ⚖
                    </button>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition duration-300 pointer-events-none"></div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3  onClick={() => navigate(`/product/${item.ProductId}`)} className="font-bold text-base text-gray-900 line-clamp-2 mb-3 cursor-pointer hover:text-blue-600 transition h-12">
                    {item.Name}
                  </h3>

                  <div className="flex items-center gap-2 mb-3 h-7">
                    <span className="text-lg text-yellow-400">★ ★ ★ ★ ★</span>
                    <span className="text-sm text-gray-500 font-medium">10</span>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-4 h-10">{item.Description}</p>

                  <div className="mb-4 h-8">
                    <span className="text-xl font-bold text-red-600">{item.Price} ₴</span>
                  </div>

                  <div className="text-sm text-gray-600 space-y-2 mb-4 pb-4 border-b border-gray-200 h-16">
                    <p>
                      <span className="font-semibold">Міцність: {item.AlcoholPercent}%</span>
                    </p>
                    <p>
                      <span className="font-semibold">Об'єм: {item.VolumeML} мл</span> 
                    </p>
                  </div>            
                  <button
                    onClick={() => {
                      dispatch(addItem(item));
                      toast.success('Товар додано у кошик! 🎉');
                      
                    } } 
                    
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 text-base"
                  >
                    🛒 У кошик
            
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500 text-lg">Ваш список бажань порожній</div>
          )}
        </div>
      </div>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default WishList;
