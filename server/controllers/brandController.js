const {Brand}=require('../models/models')
const ApiError=require('../error/ApiError')
const {Product}=require('../models/models');
const { Op } = require('sequelize');

class BrandController{
    
    async create(req, res, next) {
        try {
            const { brand_name } = req.body;
            const new_brand = await Brand.findOne({ where: { brand_name } });
            if (new_brand) {
                return next(ApiError.badRequest('Такой бренд уже существует'));
            }
            const brand = await Brand.create({ brand_name });
            return res.json(brand);
        } catch (error) {
            console.error('Ошибка при создании бренда:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
    
    async getAll(req,res){
        const brand= await Brand.findAll()
        return res.json(brand)
    }

    async getBrandsByProduct(req, res) {
    const { id_section, id_category, id_subcategory } = req.query;

    try {
        let whereClause = {}; // Объявление пустого объекта для фильтрации

        // Применение фильтров к запросу в зависимости от переданных параметров
        if (id_section) {whereClause.id_section = parseInt(id_section);}
        if (id_category) {whereClause.id_category = parseInt(id_category);}
        if (id_subcategory) {whereClause.id_subcategory = parseInt(id_subcategory);}

        // Поиск продуктов по заданным фильтрам
        console.log('whereClause:', whereClause); // Отладочный вывод
        const products = await Product.findAll({
            where: whereClause,
            attributes: ['id_brand'], // Выбор только идентификаторов брендов
            raw: true // Возвращение данных в виде простого объекта
        });

        // Если продуктов нет, возвращаем пустой массив
        if (products.length === 0) {
            return res.json([]);
        }

        // Извлечение уникальных идентификаторов брендов из продуктов
        const brandIds = [...new Set(products.map(product => product.id_brand))];

        // Поиск брендов по уникальным идентификаторам
        const brands = await Brand.findAll({
            where: {id_brand: {[Op.in]: brandIds}}
        });

        return res.json(brands);
    } catch (error) {
        console.error("Error fetching filtered brands:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

    async getBrandsBySaleProduct(req, res) {
        try {
            const whereClause = {
                published: true, 
                sale: {
                    [Op.gt]: 0 
                }
            };
    
            console.log('whereClause:', whereClause); // Debugging output
    
            const products = await Product.findAll({
                where: whereClause,
                attributes: ['id_brand'], 
                raw: true 
            });
    
            if (products.length === 0) {
                return res.json([]);
            }
    
            const brandIds = [...new Set(products.map(product => product.id_brand))];
    
            const brands = await Brand.findAll({
                where: {
                    id_brand: {
                        [Op.in]: brandIds
                    }
                }
            });
    
            return res.json(brands);
        } catch (error) {
            console.error("Error fetching filtered brands:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    

    async getBrandsByNewProduct(req, res) {
        try {
            const whereClause = { 
                published: true, // Exclude hidden products
                new_status: true // Only include new products
            };
    
            console.log('whereClause:', whereClause); // Debugging output
    
            const products = await Product.findAll({
                where: whereClause,
                attributes: ['id_brand'], 
                raw: true 
            });
    
            if (products.length === 0) {
                return res.json([]); 
            }
            
            const brandIds = [...new Set(products.map(product => product.id_brand))];
    
            const brands = await Brand.findAll({
                where: {
                    id_brand: {
                        [Op.in]: brandIds
                    }
                }
            });
    
            return res.json(brands);
        } catch (error) {
            console.error("Error fetching filtered brands:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    

    async delete(req, res, next) {
        try {
            const { id_brand } = req.params;
            const brand = await Brand.findByPk(id_brand);
            if (!brand) {
                return next(ApiError.notFound('Бренд не найден'));
            }
            await brand.destroy();
            return res.json({ message: 'Бренд успешно удален' });
        } catch (error) {
            console.error('Ошибка при удалении бренда:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async update(req, res, next) {
        try {
            const { id_brand } = req.params;
            const { brand_name } = req.body;
            let brand = await Brand.findByPk(id_brand);
            if (!brand) {
                return next(ApiError.notFound('Бренд не найден'));
            }
            brand.brand_name = brand_name;
            await brand.save();
            return res.json(brand);
        } catch (error) {
            console.error('Ошибка при обновлении бренда:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
    
     
}

module.exports=new BrandController()