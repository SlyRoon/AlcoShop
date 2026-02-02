import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { increment, decrement, removeItem } from '../store/itemSlice';
import { selectTotalPrice } from '../store/itemSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

function Cart({ isOpen, onClose }: CartProps) {
  const totalPrice = useSelector((state: RootState) => selectTotalPrice(state));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemCard = useSelector((state: RootState) => state.items.items);

  const hadnleCheckout = () => {
    toast.success('Переходимо до оформлення!');
    navigate('/checkout');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}>
      <div
        className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Шапка */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Кошик</h2>
          <button onClick={onClose} className="text-2xl font-bold text-gray-500 hover:text-red-600">
            ✕
          </button>
        </div>

        {/* Список товарів */}
        <div className="p-6 space-y-4">
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
                      onClick={() => {
                        dispatch(decrement(item.ProductId));

                        toast('➖ Кількість зменшено');
                      }}
                      className="px-2 py-1 bg-white hover:bg-green-500 border rounded"
                    >
                      −
                    </button>

                    <span>{item.amount}</span>

                    <button
                      onClick={() => {
                        dispatch(increment(item.ProductId));
                        toast.success('Додано ще одну одиницю!');
                      }}
                      className="px-2 py-1 bg-white hover:bg-green-500 border rounded"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold text-red-600">{item.Price} ₴</span>
                </div>
              </div>

              <button
                onClick={() => {
                  dispatch(removeItem(item.ProductId));
                  toast.error('Товар видалено з кошика!');
                }}
                className="text-red-500 hover:text-red-700"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 right-0 w-96 p-6 bg-white border-t">
          <div className="mb-4 p-3 bg-green-50 rounded border border-green-200">
            <p className="text-lg font-bold text-gray-800">
              Всього: <span className="text-green-600">{totalPrice}</span>
            </p>
          </div>
          <button
            onClick={hadnleCheckout}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded transition"
          >
            Оформити замовлення
          </button>
          <button onClick={onClose} className="w-full mt-2 py-2 text-blue-600 hover:text-blue-800 font-semibold">
            Продовжити покупки
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
