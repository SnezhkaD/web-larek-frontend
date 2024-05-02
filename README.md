https://github.com/SnezhkaD/web-larek-frontend

# Проектная работа "Веб-ларек"

## Стек:

HTML, SCSS, TS, Webpack;

## Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом;

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами;

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

npm install
npm run start

или

yarn
yarn start;

### Сборка

npm run build

или

yarn build;

_______________________

## Архитектура проекта:

Проект представляет собой интернет-магазин с товарами для веб-разработчиков - **Web-ларёк**. Он состоит из трех основных частей, соответствующих слоям Model-View-Presenter (MVP):

**Слой данных (Model)** - это слой, который содержит данные и логику приложения. В нашем случае, это классы Product, Cart и Order.

**Слой отображения (View)** - это слой, который отвечает за взаимодействие с пользователем. В нашем случае, это классы ProductList, CartView и OrderView, которые отвечают за отображение данных и обработку пользовательских событий.

**Слой представления (Presenter)** - это слой, который соединяет отображение, данные и коммуникацию. Он отвечает за обработку пользовательских событий, обновление модели и обновление отображения.

## Типизация базового кода:

1. **`Product`**: Класс, представляющий товар в магазине. Содержит информацию о названии, описании, цене и изображении товара:
~~~ts
   class Product {
   id: string,
   name: string,
   description: string,
   price: number, image:
   string
   };
~~~
2. **`Cart`**: Класс, представляющий корзину пользователя. Содержит список товаров, добавленных пользователем, и методы для добавления и удаления товаров:
~~~ts
   class Cart {
   items: Product[],
   totalPrice: number
   };
~~~
3. **`Order`**: Класс, представляющий заказ пользователя. Содержит информацию о пользователе, список товаров в заказе и статус заказа:
~~~ts
   class Order {
   id: string,
   userId: string,
   products: Product[],
   status: string
   };
~~~
\*Описание компонентов, их функций и связей с другими компонентами:

**`ProductList`**: Класс, отображающий список товаров. Связан с `Product` для отображения информации о каждом товаре:
~~~ts
class ProductList {
products: Product[];
};
~~~
**`CartView`**: Класс, отображающий содержимое корзины. Связан с `Cart` для отображения информации о товарах в корзине:
~~~ts
class CartView {
cart: Cart;
} ;
~~~
**`OrderView`**: Класс, отображающий информацию о заказе. Связан с `Order` для отображения статуса заказа и списка товаров:
~~~ts
class OrderView {
order: Order;
};
~~~
\*Интерфейсы моделей данных бизнес-логики:

1. **`IProduct`**: Интерфейс для класса `Product`:
~~~ts
   interface IProduct {
   id: string;
   name: string;
   description: string;
   price: number;
   image: string
   };
~~~
2. **`ICart`**: Интерфейс для класса `Cart`:
~~~ts
   interface ICart {
   items: IProduct[];
   totalPrice: number;
   addProduct: (product: IProduct) => void;
   removeProduct: (productId: string) => void;
   };
~~~
3. **`IOrder`**: Интерфейс для класса `Order`:
~~~ts
   interface IOrder {
   id: string;
   userId: string;
   products: IProduct[];
   status: string;
   };
~~~
## Класс Api

Класс **`Api`** представляет базовый API-клиент, который включает в себя методы для отправки GET и POST запросов.

## Конструктор

Конструктор класса принимает базовый URL и дополнительные опции для запросов.

## Методы

- ***`get`*** - Отправляет GET запрос на указанный URI.
- ***`post`*** - Отправляет POST или PUT или DELETE запрос на указанный URI с данными.

## Обработка ответов

Метод **`handleResponse`** обрабатывает ответы от сервера. Если ответ успешный, возвращается объект, полученный из JSON. Если ответ не успешный, возвращается отклоненная промис с текстом ошибки.

## Типы

- **`ApiListResponse<Type>`** - Представляет ответ сервера, содержащий общее количество элементов и массив элементов.
- **`ApiPostMethods`** - Перечисление методов, которые могут быть использованы для отправки POST запроса.

# Слой представления 

# Интерфейс IEvents

Интерфейс **`IEvents`** определяет методы для подписки на события (`on`), инициирования событий (`emit`), инициирования событий с частичным контекстом (`trigger`).

### Методы

- ***`on<T extends object>(event: EventName, callback: (data: T) => void): void`*** - Подписывает обработчик на событие.
- ***`emit<T extends object>(event: string, data?: T): void`*** - Инициирует событие с данными.
- ***`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void`*** - Создает функцию, которая будет инициировать событие с частичным контекстом.

## Класс EventEmitter

Класс **`EventEmitter`** реализует интерфейс **`IEvents`** и предоставляет методы для управления подписками на события, инициирования событий и создания функций-триггеров.

### Конструктор

- **`constructor()`** - Инициализирует пустую карту событий.

### Методы

- ***`on<T extends object>(eventName: EventName, callback: (event: T) => void)`*** - Подписывает обработчик на событие.
- ***`off(eventName: EventName, callback: Subscriber)`*** - Отписывает обработчик от события.
-***`emit<T extends object>(eventName: string, data?: T)`*** - Инициирует событие с данными.
- ***`onAll(callback: (event: EmitterEvent) => void)`*** - Подписывает обработчик на все события.
- ***`offAll()`*** - Отписывает все обработчики от всех событий.
- ***`trigger<T extends object>(eventName: string, context?: Partial<T>)`*** - Создает функцию, которая будет инициировать событие с частичным контекстом.

### Типы

- **`EventName`** - Псевдоним для строки или регулярного выражения, используемый для идентификации событий.
- **`Subscriber`** - Псевдоним для функции, используемый для обработки событий.
- **`EmitterEvent`** - Псевдоним для объекта, содержащего имя события и данные.
