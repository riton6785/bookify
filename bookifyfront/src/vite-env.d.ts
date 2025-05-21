/// <reference types="vite/client" />

interface User {
    _id: string;
    email: string;
    name: string;
    pic: string;
    token: string;
}

interface StateType {
    user: User | null;
}

interface Book {
    _id: string;
    name: string;
    price:  number;
    author: string;
    description: string;
    publisher: string;
    pic: string;
    updatedAt: string;
    createdAt: string;
}

interface BookListDetails extends Book {
    isPublished: boolean;
    stock: number;
    __v: number;
}

type CartProduct = {
    _id: string,
    name: string;
    pic: string;
    price: number
}
type CartData = {
    product: CartProduct;
    quantity: number;
}

type Wishlist = {
    id: string;
}

interface CartState {
    cart: CartData[];
    wishlist: Wishlist[];
}