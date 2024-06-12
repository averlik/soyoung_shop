const Router=require('express')
const router=new Router()
const orderController=require('../controllers/orderController')
const checkRole=require('../middleware/checkRoleMiddleware')


router.post('/create',checkRole('USER'),  orderController.createOrder);

router.get('/all', checkRole('ADMIN'), orderController.getAllOrder);
router.get('/stores', orderController.getStores);
router.get('/info/:id_order', checkRole('USER'), orderController.getOrder);
router.get('/getinfo/:id_order', checkRole('ADMIN'), orderController.getOrder);
router.get('/status', checkRole('ADMIN'), orderController.getOrdersByStatus);
router.get('/', checkRole('USER'), orderController.getUserOrder);

router.put('/update/:id_order', checkRole('ADMIN'), orderController.updateOrderStatus);

module.exports=router


