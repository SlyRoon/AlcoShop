import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { increment, decrement, removeItem, clearCart } from '../store/itemSlice';
import { RootState } from '../store/store';
import { selectTotalPrice } from '../store/itemSlice';
import { selectTotalPriceDeliver } from '../store/itemSlice';
import OrderService from '../service/order/OrderSrevice';
import UpdateUserInfoService from '../service/user/UpdateUserInfoServise';

import { toast } from 'react-toastify';

function CardMenuOrder() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [dontPrintCheck, setDontPrintCheck] = useState(true);
  const totalPrice = useSelector((state: RootState) => selectTotalPrice(state));
  const totalPriceDeliver = useSelector((state: RootState) => selectTotalPriceDeliver(state));
  const itemCard = useSelector((state: RootState) => state.items.items);

  const user = useSelector((state: RootState) => state.auth.user);
  
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const cartItems = useSelector((state: RootState) => state.items.items);
  const setCount = cartItems.reduce((sum, item) => sum + item.amount, 0);
  const [isLoadMenuAbout, setIsLoadMenuAbout] = useState(true);
  const [isLoadMenuAboutForm, setIsLoadMenuAboutForm] = useState(false);


  const [phone , setPhone ] = useState('')
  const [surname , setSurName] = useState('')
  const [name , setName ] = useState('')
  const [address, setAddress] = useState('')
  
  const getOrderItem = async () => {
    if (!itemCard || itemCard.length === 0) {
      return toast.warning('🛒 Кошик порожній, покладіть щось в нього!');
    }
    try {
      setIsLoading(true);
      await OrderService.createOrder(itemCard, Number((user as any).id), totalPriceDeliver, paymentMethod);

      dispatch(clearCart());
    
      toast.success('Замовлення успішно створено! 🎉');
      
      
    } catch (e) {
      console.error(e);
  
      toast.error('❌ Помилка при створенні замовлення');
    } finally {
      setIsLoading(false);
    }
  };

  const UpdateUserInfo = async() => {
    if (!name.trim() || !surname.trim() || !phone.trim() || !address.trim()) {

        return toast.warning("⚠️ Будь ласка, заповніть всі поля");
    }
    try {
        await UpdateUserInfoService.UpdateUserInfoService(
            Number((user as any).id), 
            name, 
            surname, 
            Number(phone), 
            address 
        );
        
        setIsLoadMenuAboutForm(false);
        setIsLoadMenuAbout(true);

        toast.success("Дані успішно оновлено! ✅");
        
    } catch(e) {
      console.error(e);
  
      toast.error("❌ Не вдалося оновити дані");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition flex items-center gap-2"
      >
        ← Назад
      </button>
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8">

        <div className="col-span-2 space-y-6">
      
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ваші контактні дані</h2>
            <div className="space-y-3">
              {isLoadMenuAbout && (
                <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:border-gray-400 animate-slideDown">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👤</span>
                    <div>
                    
                      <p className="text-gray-800 font-semibold">{user ? (user as any).FullName : 'Гість'}</p>
                      <p className="text-gray-500 text-sm">{user ? (user as any).email : ''}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsLoadMenuAboutForm(true);
                      setIsLoadMenuAbout(false);
                    }}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Змінити
                  </button>
                </div>
              )}

              {isLoadMenuAboutForm && (
                <div className="space-y-4 animate-slideDown">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Мобільний телефон</label>
                      <input
                        type="tel"
                        placeholder="+38 067 257 84 88"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    
                  
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Електронна пошта</label>
                      <div className="w-full p-3 border border-gray-200 bg-gray-100 rounded-lg text-gray-500 cursor-not-allowed">
                        {(user as any)?.email}
                      </div>
                    </div>
                   

                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Прізвище</label>
                      <input
                        type="text"
                        placeholder="Прізвище"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        value={surname}
                        onChange={(e) => setSurName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Ім'я</label>
                      <input
                        type="text"
                        placeholder="Ім'я"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Адреса</label>
                    <input
                      type="text"
                      placeholder="Житомир"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setIsLoadMenuAboutForm(false);
                        setIsLoadMenuAbout(true);
                      }}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
                    >
                      Згорнути
                    </button>
                    <button
                      onClick={UpdateUserInfo}
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
                    >
                      Підтвердити
                    </button>
                  </div>
                </div>
              )}
              
              {/* Нижня статична плашка (адреса) */}
              <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:border-gray-400">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-gray-800 font-semibold">{(user as any)?.Address || "Адреса не вказана"}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Оплата */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Оплата</h2>
            <div className="space-y-3">
              <label
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                  paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'card'}
                  readOnly
                  className="w-5 h-5 mr-4"
                />
                <span className="text-gray-800 font-semibold">Карткою</span>
              </label>
              <label
                onClick={() => setPaymentMethod('cash')}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                  paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cash'}
                  readOnly
                  className="w-5 h-5 mr-4"
                />
                <span className="text-gray-800 font-semibold">Готівкою</span>
              </label>
            </div>
          </div>

          {/* Замовлення */}
          <div className="bg-white rounded-lg shadow p-6">
            {itemCard.map((item) => (
              <div key={item.ProductId} className="flex gap-4 pb-4 border-b">
                <img
                  src={`http://localhost:5000/images/${item.ImagePath}`}
                  alt={item.Name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{item.Name}</h3>
                  <p className="text-gray-600 text-xs mb-2">Продавець</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dispatch(decrement(item.ProductId))}
                        className="px-2 py-1  bg-white hover:bg-green-500 border rounded"
                      >
                        −
                      </button>
                      <span>{item.amount}</span>
                      <button
                        onClick={() => dispatch(increment(item.ProductId))}
                        className="px-2 py-1 bg-white hover:bg-green-500 border rounded"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-red-600">{item.Price} ₴</span>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeItem(item.ProductId))}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Права часть - підсумок */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Разом</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-700">Кількість товарів: {setCount}</span>
                <span className="font-semibold text-gray-800">{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Вартість доставки</span>
                <span className="font-semibold text-gray-800">110 ₴</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-800">До сплати</span>
              <span className="text-3xl font-bold text-gray-800">{totalPriceDeliver}</span>
            </div>

            <button
              onClick={getOrderItem}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition mb-4"
            >
              Замовлення підтверджую
            </button>

            <div className="text-xs text-gray-600 space-y-2">
              <p className="font-semibold">Підтверджуючи замовлення, я приймаю умови:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>положення про обробку і захист даних</li>
                <li>умови користування</li>
              </ul>
              <label className="flex items-start gap-2 mt-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dontPrintCheck}
                  onChange={() => setDontPrintCheck(!dontPrintCheck)}
                  className="mt-1"
                />
                <span>Не друкувати паперові чеки та гарантійні талони</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardMenuOrder;





