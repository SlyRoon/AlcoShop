import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminProductPanel() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [alcoholPercent, setAlcoholPercent] = useState('');
  const [volumeML, setVolumeMl] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [imagePath, setImagePath] = useState('');

  const addProduct = async () => {
    if (
      !name.trim() ||
      !categoryId.trim() ||
      !price.trim() ||
      !alcoholPercent.trim() ||
      !volumeML.trim() ||
      !stock.trim() ||
      !description.trim() ||
      !imagePath.trim()
    )
      return toast.warning('⚠️ Будь ласка, заповніть всі поля');
      try{
        // Сделать Сервис + UProduct 
      } catch(e) {
        console.error(e)
        toast.error('Не вдалося додати продукт')
      }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-full px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Управління Продуктами</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition duration-200"
              >
                ← Назад
              </button>
              <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-200">
                Вийти
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex gap-4 mb-8">
          <button className="px-8 py-3 font-semibold rounded-lg transition duration-200 bg-blue-500 hover:bg-blue-600 text-white shadow-md">
            ➕ Додати Продукт
          </button>
          <button className="px-8 py-3 font-semibold rounded-lg transition duration-200 bg-white text-gray-900 border border-gray-200 hover:border-purple-500">
            ✏️ Оновити Продукт
          </button>
          <button className="px-8 py-3 font-semibold rounded-lg transition duration-200 bg-white text-gray-900 border border-gray-200 hover:border-red-500">
            🗑️ Видалити Продукт
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Додати Новий Продукт</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Назва</label>
              <input
                type="text"
                placeholder="Введіть назву продукту"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ID Категорії</label>
              <input
                type="text"
                placeholder="Введіть ID категорії"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Ціна (₴)</label>
              <input
                type="number"
                placeholder="Введіть ціну"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Крепість (%)</label>
              <input
                type="number"
                placeholder="Введіть крепість"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={alcoholPercent}
                onChange={(e) => setAlcoholPercent(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Об'єм (мл)</label>
              <input
                type="number"
                placeholder="Введіть об'єм"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={volumeML}
                onChange={(e) => setVolumeMl(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Кількість на складі</label>
              <input
                type="number"
                placeholder="Введіть кількість"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={stock}
                onChange={(e) => setVolumeMl(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Зображення (URL)</label>
              <input
                type="text"
                placeholder="Введіть URL зображення"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={imagePath}
                onChange={(e) => setImagePath(e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Опис</label>
              <textarea
                placeholder="Введіть опис продукту"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <button onClick={addProduct} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition duration-200 text-lg shadow-md hover:shadow-lg">
            ✅ Додати Продукт
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminProductPanel;
