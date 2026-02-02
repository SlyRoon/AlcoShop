import { useNavigate } from 'react-router-dom';

function AdminPanel () {
    const navigate = useNavigate()
    
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-full px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-900">Адмін Панель</h1>
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate('/')} className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition duration-200">
                                ← Назад
                            </button>
                            <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-200">
                                Вийти
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="p-8 max-w-7xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Управління</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Product Button */}
                        <button onClick={() => navigate('/admin-panel/products')} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 p-6 text-left group hover:border-blue-500 hover:scale-105 transform">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-5xl">📦</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Продукти</h3>
                            <p className="text-gray-600 text-sm mb-6">Управління товарами в каталозі</p>
                            <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition">
                                Перейти <span className="group-hover:translate-x-1 transition">→</span>
                            </div>
                        </button>

                        {/* Categories Button */}
                        <button className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 p-6 text-left group hover:border-purple-500 hover:scale-105 transform">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-5xl">🏷️</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Категорії</h3>
                            <p className="text-gray-600 text-sm mb-6">Додавання та редагування категорій</p>
                            <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition">
                                Перейти <span className="group-hover:translate-x-1 transition">→</span>
                            </div>
                        </button>

                        {/* Orders Button */}
                        <button className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 p-6 text-left group hover:border-green-500 hover:scale-105 transform">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-5xl">📋</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Замовлення</h3>
                            <p className="text-gray-600 text-sm mb-6">Перегляд та управління замовленнями</p>
                            <div className="flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition">
                                Перейти <span className="group-hover:translate-x-1 transition">→</span>
                            </div>
                        </button>

                        {/* Reviews Button */}
                        <button className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 p-6 text-left group hover:border-orange-500 hover:scale-105 transform">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-5xl">⭐</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Відгуки</h3>
                            <p className="text-gray-600 text-sm mb-6">Модерація та управління відгуками</p>
                            <div className="flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-3 transition">
                                Перейти <span className="group-hover:translate-x-1 transition">→</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-12">
                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                        <p className="text-gray-600 text-sm font-medium mb-2">Всього товарів</p>
                        <p className="text-3xl font-bold text-gray-900">0</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                        <p className="text-gray-600 text-sm font-medium mb-2">Категорій</p>
                        <p className="text-3xl font-bold text-gray-900">0</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                        <p className="text-gray-600 text-sm font-medium mb-2">Замовлень</p>
                        <p className="text-3xl font-bold text-gray-900">0</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                        <p className="text-gray-600 text-sm font-medium mb-2">Відгуків</p>
                        <p className="text-3xl font-bold text-gray-900">0</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel