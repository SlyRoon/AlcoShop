import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/itemSlice';
import ProductService from '../service/product/ProductService';
import { ICategoryProducts } from '../models/category/ICategoryProducts';
import { RootState } from '../store/store';
import Cart from './CardMenu';
import ReviewService from '../service/review/ReviewService';
import { IGetReview } from '../models/review/IGetReview';
import { likeItems } from '../store/wishListSlice';
import { toast } from 'react-toastify';

function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.items.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.amount, 0);
  const likedItems = useSelector((state: RootState) => state.like.items);
  const user = useSelector((state: RootState) => state.auth.user);

  const [product, setProduct] = useState<ICategoryProducts | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [review, setReview] = useState<IGetReview[]>([]);

  useEffect(() => {
    if (productId) {
      fetchProduct();
      getReviewProduct();
    }
  }, [productId]);

  async function fetchProduct() {
    try {
      const response = await ProductService.getOneProduct(Number(productId));
      setProduct(response.data);
    } catch (err) {
      console.error('Помилка:', err);
    } finally {
      setIsLoading(false);
    }
  }

  const postReviewProduct = async () => {
    if (!productId) {
      toast.error('Помилка з ID товара');
      return;
    }

    if (!user) {
      toast.error('Будь ласка, увійдіть до акаунту 🔒');
      return;
    }

    if (rating === 0) {
      toast.warning('⚠️ Будь ласка, виберіть оцінку!');
      return;
    }

    if (comment.trim() === '') {
      toast.warning('⚠️ Будь ласка, напишіть коментар!');
      return;
    }

    try {
      await ReviewService.postReviewProduct(Number(productId), rating, comment, Number((user as any).id));

      toast.success('Коментар успішно створено! 🎉');

      setComment('');
      setRating(0);
      getReviewProduct();
    } catch (e) {
      console.error(e);
      toast.error('Помилка при створенні відгуку 😞');
    }
  };

  const getReviewProduct = async () => {
    try {
      const response = await ReviewService.getReviewProduct(Number(productId));
      setReview(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const renderStars = (count: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-2xl ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Загрузка...</div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Товар не знайдено</h2>
        <button onClick={() => navigate('/')} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          На головну
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-full px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">AlcoShop!</h1>
            <div className="flex gap-3">
              
           
              <button 
                onClick={() => navigate('/wish-list')}
                className="relative px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200 flex items-center gap-2"
              >
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
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <div className="w-full h-96 bg-gray-200 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                {product.ImagePath ? (
                  <img
                    src={`http://localhost:5000/images/${product.ImagePath}`}
                    alt={product.Name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-lg">Фото товару</span>
                )}
              </div>

              <button
                onClick={() => {
                  dispatch(addItem(product));
                  toast.success('Товар додано у кошик! 🎉');
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg mb-3 transition"
              >
                В кошик
              </button>
              {(() => {
                const isLiked = likedItems.some((likedItem) => likedItem.ProductId === product.ProductId);
                return (
                  <button
                    onClick={() => {
                      dispatch(likeItems(product));
                      toast.success('Товар додано у спискок бажань 🎉');
                    }}
                  
                    className={`w-full font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition duration-200 ${
                      isLiked
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'  
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200' 
                    }`}
                  >
                 
                    {isLiked ? '♥' : '♡'} Список бажань
                  </button>
                );
              })()}
            
            </div>
          </div>

          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.Name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-1">{renderStars(4)}</div>
                <span className="text-sm text-gray-600">8 відгуків</span>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-4xl font-bold text-red-600">{product.Price} ₴</span>
                </div>

                <div className="space-y-3 text-sm">
                  <p>
                    <span className="font-semibold text-gray-700">Крепість:</span> {product.AlcoholPercent}%
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Об'єм:</span> {product.VolumeML} мл
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Опис:</span> {product.Description}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Напишіть свій відгук</h2>

              <div className="space-y-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Поділіться своєю думкою про товар..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                />

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Оцінка</label>
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-4xl cursor-pointer transition ${
                          i < rating ? 'text-yellow-400' : 'text-gray-300'
                        } hover:text-yellow-300`}
                        onMouseEnter={() => setRating(i + 1)}
                        onClick={() => setRating(i + 1)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={postReviewProduct}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-200"
                >
                  Відправити відгук
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Відгуки покупців</h2>

              {review.length > 0 ? (
                <div className="space-y-6">
                  {review.map((item) => (
                    <div key={item.ReviewId} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-gray-900">{item.Users?.FullName || 'Користувач'}</p>
                          <p className="text-sm text-gray-500">{new Date(item.ReviewDate).toLocaleDateString()}</p>
                        </div>

                        <div className="flex">{renderStars(item.Rating)}</div>
                      </div>

                      <p className="text-gray-700">{item.Comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Відгуків покупців ще немає. Будьте першим!</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default ProductDetail;