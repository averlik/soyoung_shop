const Router=require('express')
const router=new Router()
const categoriesController=require('../controllers/categoriesController')
const checkRole=require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), categoriesController.create)
router.get('/',categoriesController.getAll)
router.get('/:id_section',categoriesController.getBySectionId)
router.put('/:id_category',checkRole('ADMIN'),categoriesController.update)
router.delete('/:id_category',checkRole('ADMIN'),categoriesController.delete)

module.exports=router