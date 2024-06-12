import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import {BRAND_ROUTE, ACCOUNT_ROUTE, ADMIN_ROUTE,CART_ROUTE, 
    CATALOG_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, 
    SIGNUP_ROUTE, SHOP_ROUTE, SALE_ROUTE, NEW_ROUTE,ABOUT_ROUTE,SEARCH_ROUTE } from "./utils/consts";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import ProductPage from "./pages/ProductPage";
import Catalog from "./pages/Catalog";
import Brand from "./pages/Brand"
import User from "./pages/User";
import Sale from "./pages/Sale";
import New from "./pages/New";
import AboutUs from "./pages/AboutUs"
import SearchResults from "./pages/SearchResults";

export const adminRoutes=[
    {
        path: ADMIN_ROUTE,//Админ-панель
        Component: Admin
    }
]
export const authRoutes=[
    {
        path: CART_ROUTE,//корзина
        Component: Cart
    },
    {
        path: ACCOUNT_ROUTE,//личный кабинет там и "Избранное"
        Component: User
    }
]
export const publicRoutes=[
    {
        path: SHOP_ROUTE,//главная страница
        Component: Shop
    },
    {
        path: SEARCH_ROUTE,//страница с поиском
        Component: SearchResults
    },
    {
        path: ABOUT_ROUTE,//главная страница
        Component: AboutUs
    },
    {
        path: LOGIN_ROUTE,//вход
        Component: Auth
    },
    {
        path: SIGNUP_ROUTE,//регистрация
        Component: Auth
    },
    {
        path: PRODUCT_ROUTE+'/:id_product',//страница товара
        Component: ProductPage
    },
    {
        path: CATALOG_ROUTE,//каталог
        Component: Catalog
    },
    {
        path: SALE_ROUTE,//страница с товарами накоторых идет скидка
        Component: Sale
    },
    {
        path: NEW_ROUTE,//новинки
        Component: New
    },
    {
        path: BRAND_ROUTE,//страница со списком брендов
        Component: Brand
    },
]

