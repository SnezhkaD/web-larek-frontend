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
- src/scss/styles.scss — корневой файл стилей
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

---

## Архитектура проекта:

Проект представляет собой интернет-магазин с товарами для веб-разработчиков - **Web-ларёк**. Он состоит из трех основных частей, соответствующих слоям Model-View-Presenter (MVP):

**Слой данных (Model)** - это слой, который содержит данные и логику приложения. В нашем случае, это классы Product, Cart и Order.

**Слой отображения (View)** - это слой, который отвечает за взаимодействие с пользователем. В нашем случае, это классы ProductList, CartView и OrderView, которые отвечают за отображение данных и обработку пользовательских событий.

**Слой представления (Presenter)** - это слой, который соединяет отображение, данные и коммуникацию. Он отвечает за обработку пользовательских событий, обновление модели и обновление отображения.

---
#_Типы данных:_

- Интерфейс, описывающий карточку товара:

```ts
interface IProduct {
	id: string; // Уникальный идентификатор товара
	name: string; //Название товара
	description: string; //Описание товара
	price: number; //Цена товара
	image: string; //URL изображения товара
}
```

- Интерфейс для класса Basket:

```ts
interface IBasket {
	items: HTMLElement[]; // Массив элементов, представляющих товары в корзине
	price: number; // Общая цена товаров в корзине
}
```

- Интерфейс для класса Order:

```ts
interface IOrderForm {
	email: string; //Электронный адрес пользователя
	phone: string; //Номер телефона пользователя
}
```

- Интерфейс IOrder, расширяющий IOrderForm:

```ts
interface IOrder extends IOrderForm {
	items: string[]; // Массив строк, представляющий идентификаторы или описания товаров, включенных в заказ
}
```

- Интерфейс для класса Card:

```ts
interface ICard {
	id: string; //Уникальный идентификатор карточки
	title: string; //Заголовок карточки
	category: string; //Категория, к которой относится карточка
	description: string; //Текст, отображаемый на карточке
	image: string; // URL изображения, отображаемого на карточке
}
```

- Интерфейс для класса Page:

```ts
interface IPage {
	counter: number; //Счетчик на странице
	catalog: HTMLElement[]; //Каталог товаров или элементов
	locked: boolean; //Логическое значение, указывающее, заблокирована ли страница для взаимодействия пользователя
}
```

- Интерфейс для класса AppState:

```ts
interface IAppState {
	basket: Product[]; // Массив товаров в корзине
	order: IOrder; // Текущий заказ
	catalog: Product[]; // Каталог товаров
	formErrors: FormErrors; // Ошибки формы
}
```

- Интерфейс для класса EventEmitter:

```ts
interface IEvents {
	on<T extends object>(event: EventName, callback: (data: T) => void): void;
	emit<T extends object>(event: string, data?: T): void;
	trigger<T extends object>(
		event: string,
		context?: Partial<T>
	): (data: T) => void;
}
```

- Интерфейс для класса Form:

```ts
interface IFormState {
	valid: boolean; // Флаг валидности формы
	errors: string[]; // Массив строк с ошибками
}
```

- Тип **FormErrors**, который используется для представления ошибок формы:

```ts
type FormErrors = Partial<Record<keyof IOrder, string>>;
```
---
 #_Базовые классы:_ 

- **Api**
Класс, представляющий базовый API-клиент, который включает в себя методы для отправки GET и POST запросов:

```ts
class Api {
	//Конструктор класса принимает базовый URL и дополнительные опции для запросов
	constructor(baseUrl: string, options: RequestInit = {});

	//Метод, который обрабатывает ответы от сервера
	protected async handleResponse(response: Response): Promise<Partial<object>>;

	// Get запрос
	async get(uri: string);

	// Post запрос
	async post(uri: string, data: object);
}
```

- **EventEmitter**
Класс реализует интерфейс **IEvents** и предоставляет методы для управления подписками на события, инициирования событий и создания функций-триггеров:

```ts
class EventEmitter implements IEvents {
    //Конструктор инициализирует пустую карту событий
	constructor()ж

	//Подписывает обработчик на событие
	on<T extends object>(eventName: EventName, callback: (event: T) => void);

	//Отписывает обработчик от события
	off(eventName: EventName, callback: Subscriber);

	//Инициирует событие с данными
	emit<T extends object>(eventName: string, data?: T);

	//Подписывает обработчик на все события
	onAll(callback: (event: EmitterEvent) => void); 

	//Отписывает все обработчики от всех событий
	offAll();

	//Создает функцию, которая будет инициировать событие
	trigger<T extends object>(eventName: string, context?: Partial<T>);
}
```

- **Component**
Абстрактный базовый класс для компонентов отображения:

```ts
abstract class Component<T> {
	//Конструктор класса принимает один параметр: элемент HTML, в котором будет отображаться компонент
	protected constructor(protected readonly container: HTMLElement);

	// Переключить класс
	toggleClass(element: HTMLElement, className: string, force?: boolean) {}

	// Сменить статус блокировки
	setDisabled(element: HTMLElement, state: boolean) {}

	// Скрыть
	protected setHidden(element: HTMLElement) {}

	// Показать
	protected setVisible(element: HTMLElement) {}

	// Установить изображение с альтернативным текстом
	protected setImage(element: HTMLImageElement, src: string, alt?: string) {}

	// Вернуть корневой DOM-элемент
	render(data?: Partial<T>): HTMLElement {}
}
```

- **Model**
Абстрактный базовый класс для моделей данных:

```ts
abstract class Model<T> {
	//Конструктор класса принимает два параметра:  объект, который представляет данные модели и объект, который содержит обработчики событий для модели
	constructor(data: Partial<T>, protected events: IEvents);

	//Этот метод используется для генерации событий, которые уведомляют подписчиков об изменениях в модели
	emitChanges(event: string, payload?: object);
}
```
---
#_Слой данных:_

- **AppState**
Класс, описывающий состояние приложения, наследуется от Model:

```ts
class AppState extends Model<IAppState> {
	basket: Product[];
	order: IOrder;
	catalog: Product[];
	formErrors: FormErrors;

	// Метод для добавления товара в корзину
	addToBasket(value: Product);

	// Метод для полной очистки корзины
	clearBasket();

	// Метод для получения общей суммы заказа
	getTotal();

	// Метод для установки каталога товаров
	setCatalog();

	// Метод для валидации заказа
	validateOrder();

	// Метод для установки поля заказа
	setOrderField(field: keyof IOrderForm, value: string);
}
```
---
#_Слой представления:_

- **Basket**
Класс, представляющий корзину пользователя. Содержит список товаров, добавленных пользователем, и методы для добавления и удаления товаров:

```ts
class Basket extends Component<IBasket> {
	// Конструктор класса, который принимает контейнер и EventEmitter
	constructor(container: HTMLElement, protected events: EventEmitter);

	// Сеттер для установки цены корзины
	set price(price: number);

	// Сеттер для установки списка элементов в корзине
	set list(items: HTMLElement[]);

	// Метод для отключения кнопки
	disableButton();
}
```

- **Form**
Класс представляет собой компонент формы, который наследуется от базового класса Component и реализует дополнительные методы для управления состоянием и валидацией формы:

```ts
class Form<T> extends Component<IFormState> {
	// Конструктор класса, который принимает контейнер формы и и обработчик событий
	constructor(protected container: HTMLFormElement, protected events: IEvents);

	// Метод, который вызывается при изменении поля ввода
	protected onInputChange(field: keyof T, value: string);

	// Сеттер для установки флага валидности формы
	set valid(value: boolean);

	// Сеттер для установки ошибки формы
	set errors(value: string);

	//Метод для рендеринга формы с новым состоянием
	render(state: Partial<T> & IFormState);
}
```
---
#_Компоненты предметной области:_

- **Card**
Класс является подклассом Component и представляет карточку в пользовательском интерфейсе:

```ts
class Card extends Component<ICard> {
	//Конструктор класса принимает один параметр, элемент HTML, в котором будет отображаться карточка
	constructor(container: HTMLElement);

	// Сеттер и геттер для идентификатора карточки
	set id(value: string);
	get id(): string;

	// Сеттер и гетер для заголовка карточки
	set title(value: string);
	get title();

	// Сеттер для изображения, отображаемое на карточке
	set image();

	//Сеттер и гетер для текста, отображаемого на карточке
	set description(value: string | string[]);
	get description(): string;

	//Сеттер для категории, к которой относится карточка
	set category(value: Category): void;
}
```

- **Page**
Класс является подклассом Component и представляет собой страницу в веб-приложении:

```ts
class Page extends Component<IPage> {
	/*Конструктор класса принимает два параметра:
это элемент HTML, в котором будет отображаться страница, и объект, содержащий обработчики //событий для страницы*/
	constructor(container: HTMLElement, protected events: IEvents);

	//Сеттер для установки значения счетчика
	set counter(value: number);

	//Сеттер для установки элементов магазина
	set store(items: HTMLElement[]);

	//Сеттер для блокировки или разблокировки страницы
	set locked(value: boolean);
}
```

- **Order**
Класс, представляющий заказ пользователя. Содержит информацию о пользователе, список товаров в заказе и статус заказа:

```ts
class Order extends Form<IOrderForm> {
	// Конструктор класса, который принимает контейнер формы и и обработчик событий
	constructor(container: HTMLFormElement, events: IEvents);

	// Сеттер для установки номера телефона
	set phone(value: string);

	//Сеттер для установки адреса электронной почты
	set email(value: string);
}
```

