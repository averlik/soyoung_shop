const Router=require('express')
const router=new Router()
const sectionController=require('../controllers/sectionController')
const checkRole=require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), sectionController.create)
router.put('/:id_section',checkRole('ADMIN'), sectionController.update)
router.delete('/:id_section',checkRole('ADMIN'), sectionController.delete)
router.get('/',sectionController.getAll)

module.exports=router