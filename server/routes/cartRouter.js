const Router = require('express'); 
const router = new Router(); // Создаем новый экземпляр роутера
const cartController = require('../controllers/cartController'); // Импортируем контроллер корзины
const checkRole = require('../middleware/checkRoleMiddleware'); // Импортируем промежуточный обработчик для проверки роли пользователя

// Определяем маршрут для добавления товара в корзину, доступен только для пользователей с ролью 'USER'
router.post('/add', checkRole('USER'), cartController.addToCart);

// Определяем маршрут для получения содержимого корзины , доступен только для пользователей с ролью 'USER'
router.get('/', checkRole('USER'), cartController.getCart);

// Определяем маршрут для удаления товара из корзины по идентификатору элемента корзины, доступен только для пользователей с ролью 'USER' 
router.delete('/remove/:id_cart_item', checkRole('USER'), cartController.removeFromCart);

// Определяем маршрут для обновления информации о товаре в корзине по идентификатору элемента корзины
// доступен только для пользователей с ролью 'USER'
router.put('/update/:id_cart_item', checkRole('USER'), cartController.updateCartItem);

module.exports = router; 