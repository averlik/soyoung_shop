const {Categories}=require('../models/models')
const ApiError=require('../error/ApiError')

class CategoriesController{
 
    async create(req, res, next) {
        try {
            const { id_section, category_name } = req.body;
            // Проверяем существует ли такая же категория для данного раздела
            const existingCategory = await Categories.findOne({ where: { id_section, category_name } });
            if (existingCategory) {
                return next(ApiError.badRequest('Такая категория уже существует для данного раздела'));
            }
            // Если категории для данного раздела не существует, создаем новую
            const category = await Categories.create({ id_section, category_name });
            return res.json(category);
        } catch (error) {
            console.error('Ошибка при создании категории:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async getAll(req,res){
        const categories= await Categories.findAll()
        return res.json(categories)
    }

    async getBySectionId(req, res) {
        try {
            const { id_section } = req.params;
            const categories = await Categories.findAll({ where: { id_section } });
            return res.json(categories);
        } catch (error) {
            console.error('Ошибка при получении категорий для раздела:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }    

    async update(req, res,next) {
        try {
            const { id_category } = req.params;
            const { category_name } = req.body;
            let category = await Categories.findByPk(id_category);
            if (!category) {
                return next(ApiError.notFound('Категория не найдена'));
            }
            category.category_name = category_name;
            await category.save();
            return res.json(category);
        } catch (error) {
            console.error('Ошибка при обновлении категории:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async delete(req, res) {
        try {
            const { id_category } = req.params;
            const category = await Categories.findByPk(id_category);
            if (!category) {
                return next(ApiError.notFound('Категория не найдена'));
            }
            await category.destroy();
            return res.json({ message: 'Категория успешно удалена' });
        } catch (error) {
            console.error('Ошибка при удалении категории:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}

module.exports=new CategoriesController()