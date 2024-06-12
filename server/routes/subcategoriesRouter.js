const Router=require('express')
const router=new Router()
const subcategoriesController=require('../controllers/subcategoriesController')
const checkRole=require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), subcategoriesController.create)
router.get('/', subcategoriesController.getAll)
router.get('/:id_category', subcategoriesController.getByCatId)
router.put('/:id_subcategory', checkRole('ADMIN'), subcategoriesController.update)
router.delete('/:id_subcategory', checkRole('ADMIN'), subcategoriesController.delete)
module.exports=router