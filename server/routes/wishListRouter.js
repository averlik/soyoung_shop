const Router=require('express')
const router=new Router()
const wishController=require('../controllers/wishController')
const checkRole=require('../middleware/checkRoleMiddleware')


router.post('/add',checkRole('USER'),  wishController.addToWishList);
router.get('/', checkRole('USER'), wishController.getWishList);
router.delete('/remove/:id_wish_list_item', checkRole('USER'),wishController.removeFromWishList);

module.exports=router


