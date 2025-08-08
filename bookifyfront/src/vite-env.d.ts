/// <reference types="vite/client" />

interface User {
    _id: string;
    email: string;
    name: string;
    pic: string;
    token: string;
    role: string;
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
    genres_id: {
        _id: string,
        name: string,
    }[];
}

interface BookListDetails extends Book {
    isPublished: boolean;
    stock: number;
    __v: number;
    updatedAt: string;
    createdAt: string;
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

type ReviewData = {
    review: string;
    rating: number;
    userId: {
        _id: string,
        name: string,
        pic: string,
    }
    bookId: string;
}

interface ReviewState {
    reviews: ReviewData[]
}

interface GenresBasics {
    name: string,
    _id: string,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let Razorpay: any;  // Require to declare type here as e need it to create razorpay instance and it is not importing from any package so type script will give error while creating instance that's why declared type it is just a way to avoid typescript type error.
