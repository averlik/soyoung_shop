const Router=require('express')
const router=new Router()
const brandController=require('../controllers/brandController')
const checkRole=require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), brandController.create)

router.get('/', brandController.getAll)
router.get('/getByProduct', brandController.getBrandsByProduct)
router.get('/getBrandBySaleProd', brandController.getBrandsBySaleProduct)
router.get('/getBrandByNewProd', brandController.getBrandsByNewProduct)

router.delete('/:id_brand',checkRole('ADMIN'), brandController.delete);
router.put('/:id_brand', checkRole('ADMIN'), brandController.update);

module.exports=router




