const Router=require('express')
const router=new Router()
const feedbackController=require('../controllers/feedbackController')
const checkRole=require('../middleware/checkRoleMiddleware')

router.post('/', feedbackController.create)
router.get('/', checkRole('ADMIN'), feedbackController.getAll)
router.delete('/:id',checkRole('ADMIN'), feedbackController.delete);

module.exports=router




