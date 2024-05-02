export class Product {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
}

export class Cart {
	items: Product[];
	totalPrice: number;
}

export class Order {
	id: string;
	userId: string;
	products: Product[];
	status: string;
}

//

export interface IProduct {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
}

export interface ICart {
	items: IProduct[];
	totalPrice: number;
}

export interface IOrder {
	id: string;
	userId: string;
	products: IProduct[];
	status: string;
}

//

export class ProductList {
	products: Product[];
}

export class CartView {
	cart: Cart;
}

export class OrderView {
	order: Order;
}
