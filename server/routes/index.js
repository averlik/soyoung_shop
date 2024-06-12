// Импорт необходимых зависимостей
const Router = require('express');
// Создание экземпляра роутера
const router = new Router();
// Импорт роутеров для различных ресурсов
const userRouter = require('./userRouter');
const categoriesRouter = require('./categoriesRouter');
const brandRouter = require('./brandRouter');
const productRouter = require('./productRouter');
const subcategoriesRouter = require('./subcategoriesRouter');
const sectionsRouter = require('./sectionsRouter');
const cartRouter = require('./cartRouter');
const wishListRouter = require('./wishListRouter');
const orderRouter = require('./orderRouter');
const feedbackRouter = require('./feedbackRouter');

// Назначение обработчиков маршрутов для различных ресурсов
router.use('/user', userRouter);
router.use('/sections', sectionsRouter);
router.use('/categories', categoriesRouter);
router.use('/subcategories', subcategoriesRouter);
router.use('/brands', brandRouter);
router.use('/product', productRouter);
router.use('/cart', cartRouter);
router.use('/wishlist', wishListRouter);
router.use('/order', orderRouter);
router.use('/feedback', feedbackRouter);

// Экспорт роутера для использования в других модулях
module.exports = router;
