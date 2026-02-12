import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductService from '../service/product/ProductService';
import { ICategoryProducts } from '../models/category/ICategoryProducts';
import { getImageUrl } from '../utils/getImageUrl';

function CategoryProducts() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<ICategoryProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (categoryName) {
      fetchProducts();
    }
  }, [categoryName]);

  async function fetchProducts() {
    try {
      setIsLoading(true);
      const response = await ProductService.getProductsByCategory(categoryName!);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      console.error('Помилка при завантаженні продуктів:', err);
      setError('Не вдалося завантажити продукти');
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Загрузка ...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            ← Назад
          </button>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{categoryName}</h1>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>
            )}

            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.ProductId}
                    className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow hover:shadow-lg transition flex flex-col h-full"
                  >
                    {product.ImagePath && (
                      <img
                        src={getImageUrl(product.ImagePath)}
                        alt={product.Name}
                        className="w-full h-48 object-contain block"
                      />
                    )}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{product.Name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{product.Description}</p>
                      <div className="space-y-2 text-sm flex-1">
                        <p className="text-gray-700">
                          <span className="font-semibold">Ціна:</span> {product.Price} грн
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Крепість:</span> {product.AlcoholPercent}%
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Об'єм:</span> {product.VolumeML} мл
                        </p>
                      </div>
                      <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition">
                        В кошик
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">Продуктів у цій категорії не знайдено</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryProducts;