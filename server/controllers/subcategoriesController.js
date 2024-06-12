const {Subcategories}=require('../models/models')
const ApiError=require('../error/ApiError')

class SubcategoriesController{

    async create(req, res, next) {
        try {
            const { subcategory_name, id_category } = req.body;
            // Проверяем существует ли такая же подкатегория для данной категории
            const existingSubcategory = await Subcategories.findOne({ where: { subcategory_name, id_category } });
            if (existingSubcategory) {
                return next(ApiError.badRequest('Такая подкатегория уже существует для данной категории'));
            }
            // Если подкатегории для данной категории не существует, создаем новую
            const subcategory = await Subcategories.create({ subcategory_name, id_category });
            return res.json(subcategory);
        } catch (error) {
            console.error('Ошибка при создании подкатегории:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async getAll(req,res){
        const subcategories = await Subcategories.findAll()
        return res.json(subcategories)
    }

    async getByCatId(req, res) {
        try {
            const { id_category } = req.params;
            const subcategories = await Subcategories.findAll({ where: { id_category } });
            return res.json(subcategories);
        } catch (error) {
            console.error('Ошибка при получении категорий для раздела:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }    

    async update(req, res,next) {
        try {
            const { id_subcategory } = req.params;
            const { subcategory_name } = req.body;
            let subcategory = await Subcategories.findByPk(id_subcategory);
            if (!subcategory) {
                return next(ApiError.notFound('Подкатегория не найдена'));
            }
            subcategory.subcategory_name = subcategory_name;
            await subcategory.save();
            return res.json(subcategory);
        } catch (error) {
            console.error('Ошибка при обновлении подкатегории:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async delete(req, res) {
        try {
            const { id_subcategory } = req.params;
            const subcategory = await Subcategories.findByPk(id_subcategory);
            if (!subcategory) {
                return next(ApiError.notFound('Категория не найдена'));
            }
            await subcategory.destroy();
            return res.json({ message: 'Категория успешно удалена' });
        } catch (error) {
            console.error('Ошибка при удалении категории:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}

module.exports=new SubcategoriesController()