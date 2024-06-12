const Router=require('express')
const router=new Router()
const productController=require('../controllers/productController')
const checkRole=require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'), productController.create)
router.post('/search', productController.search);

router.get('/', productController.getAll)
router.get('/getall', checkRole('ADMIN'), productController.getAllAdmin)
router.get('/sale', productController.getAllSale)
router.get('/new', productController.getAllNew)
router.get('/:id_product',productController.getOne)
router.get('/info/:id_product',productController.getProductInfo)

router.put('/:id_product', checkRole('ADMIN'), productController.update)
router.put('/updateinfo/:id_product', checkRole('ADMIN'), productController.updateInfo)
router.delete('/delete/:id_product', checkRole('ADMIN'), productController.delete)

router.put('/:id_product/hide', checkRole('ADMIN'), productController.hideProduct);
router.put('/:id_product/unhide', checkRole('ADMIN'), productController.unhideProduct);


module.exports=router

