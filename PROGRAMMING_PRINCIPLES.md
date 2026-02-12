# Принципи програмування в проєкті AlcoShop

У цьому документі наведено аналіз дотримання основних принципів програмування в межах лабораторної роботи №1

## 1. DRY (Don't Repeat Yourself)
**Опис:** Цей принцип полягає в уникненні дублювання логіки. В моєму проєкті це реалізовано через винесення логіки роботи з API в окремі сервіси.
* **Приклад:** Замість того, щоб писати `fetch` або `axios` запити безпосередньо в кожному React-компоненті, я використовую `ReviewService.ts`. Це дозволяє перевикористовувати логіку запитів
* **Посилання на код:** [alco-shop-frontend/src/services/ReviewService.ts]([https://github.com/SlyRoon/AlcoShop/blob/main/alco-shop-frontend/src/service/review/ReviewService.ts])

## 2. SRP (Single Responsibility Principle)
**Опис:** Принцип єдиної відповідальності: кожен клас чи модуль має виконувати лише одну задачу
* **Приклад:** У бекенд-частині (`alco-shop-backend`) файл `user-router.js` відповідає виключно за визначення маршрутів (routing), тоді як бізнес-логіка та робота з базою даних делегується контролерам або сервісам Prisma
* **Посилання на код:** [alco-shop-backend/routes/index.js]([https://github.com/SlyRoon/AlcoShop/blob/main/alco-shop-backend/server/router/index.js])

## 3. KISS (Keep It Simple, Stupid)
**Опис:** Проєктування системи має бути якомога простішим, уникаючи непотрібної складності
* **Приклад:** Структура компонентів, таких як `ProductDetail.tsx`, побудована на стандартних хуках React (`useState`, `useEffect`), що робить код легким для читання та підтримки без використання переускладнених стейт-менеджерів там, де це не потрібно
* **Посилання на код:** [alco-shop-frontend/src/components/ProductDetail.tsx]([https://github.com/SlyRoon/AlcoShop/blob/main/alco-shop-frontend/src/components/ProductDetail.tsx])

## 4. SoC (Separation of Concerns)
**Опис:** Розділення відповідальності між різними шарами додатка.
* **Приклад:** Чіткий поділ на `frontend` (візуалізація та взаємодія) та `backend` (логіка та БД). Навіть всередині фронтенду стилі (Tailwind CSS) відокремлені від логіки, а типи TypeScript — від реалізації
* **Посилання на код:** [Переглянути структуру папок проєкту]([https://github.com/SlyRoon/AlcoShop/tree/main])

## 5. YAGNI (You Ain't Gonna Need It)
**Опис:** Я не додаю функціонал, який не потрібен зараз
* **Приклад:** Моделі в `schema.prisma` містять лише необхідні поля для роботи магазину (назва, ціна, категорія), без надлишкових зв'язків "на майбутнє"
* **Посилання на код:** [alco-shop-backend/prisma/schema.prisma]([https://github.com/SlyRoon/AlcoShop/blob/main/alco-shop-backend/server/prisma/schema.prisma])



пропозиції про покращення коду! 