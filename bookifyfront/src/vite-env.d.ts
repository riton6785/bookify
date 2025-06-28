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
