const uuid=require('uuid');//для загрузки файлов
const path=require('path');
const fs = require('fs');
const {Product, ItemInfo}=require('../models/models');
const ApiError = require('../error/ApiError');
const { where } = require('sequelize');
const { Op } = require('sequelize'); 


class ProductController{
  
    async create(req, res, next) {
        try {
            let {
                ru_product_name,
                eng_product_name,
                id_subcategory,
                id_category,
                id_section,
                id_brand,
                price,
                sale,
                published,
                quantity,
                new_status,
                info // Добавляем info в параметры запроса
            } = req.body;
  
            const { image } = req.files;
            let fileName = uuid.v4() + ".jpg";
            image.mv(path.resolve(__dirname, '../', 'static', fileName));
  
            // Создаем продукт
            const product = await Product.create({
                ru_product_name,
                eng_product_name,
                id_subcategory,
                id_category,
                id_section,
                id_brand,
                price,
                sale,
                published,
                new_status,
                quantity,
                image: fileName
            });
  
            // Если есть информация о продукте (ItemInfo), сохраняем ее
            if (info) {
              info = JSON.parse(info)
                // Проходимся по каждому объекту info и создаем соответствующий ItemInfo
                info.forEach(i => {
                     ItemInfo.create({
                        id_product: product.id_product,
                        description: i.description,
                        skin_type: i.skin_type,
                        volume: i.volume,
                        components: i.components,
                        applying: i.applying,
                        ingredients: i.ingredients
                    });
                });
            }
  
            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
          const { id_product } = req.params;
          let {
            ru_product_name,
            eng_product_name,
            id_subcategory,
            id_category,
            id_section,
            id_brand,
            price,
            sale,
            new_status,
            quantity,
            published,
            
          } = req.body;
      
          //Находим продукт по id
            const product = await Product.findByPk(id_product);
            if (!product) {
                return next(ApiError.badRequest('Product not found'));
            }
          const { image } = req.files || {};
            let fileName;
            if (image) {
                fileName = uuid.v4() + ".jpg";
                image.mv(path.resolve(__dirname, '../', 'static', fileName));
            }
          //Обновляем информацию о продукте
          await Product.update({
            ru_product_name,
            eng_product_name,
            id_subcategory,
            id_category,
            id_section,
            id_brand,
            price,
            sale,
            quantity,
            new_status,
            published,
            image: fileName || product.image // сохраняем старое изображение, если новое не загружено
          }, {
            where: { id_product }
          });
          
          return res.json({ message: 'Product updated successfully' });
        } catch (error) {
          next(ApiError.badRequest(error.message));
        }
    }

    async updateInfo(req, res, next) {
        try {
            const { id_product } = req.params;
            let {
                description,
                skin_type,
                volume,
                components,
                applying,
                ingredients
            } = req.body;
    
            // Находим или создаем информацию о товаре для данного id_product
            let itemInfo = await ItemInfo.findOne({ where: { id_product: id_product } });
            if (!itemInfo) {
                itemInfo = await ItemInfo.create({
                    id_product: id_product,
                    description,
                    skin_type,
                    volume,
                    components,
                    applying,
                    ingredients
                });
            } else {
                // Обновляем информацию о товаре
                await itemInfo.update({
                    description,
                    skin_type,
                    volume,
                    components,
                    applying,
                    ingredients
                });
            }
    
            return res.json({ message: 'Product info updated successfully' });
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getProductInfo(req,res){
        const{id_product}=req.params;
        const itemInfo=await ItemInfo.findOne(
        { where: { id_product: id_product } }
        );
        return res.json(itemInfo)
    }

    async delete(req, res, next) {
        try {
            const { id_product } = req.params;

            // Ищем товар по ID
            const product = await Product.findByPk(id_product);
            if (!product) {
                return next(ApiError.badRequest('Product not found'));
            }

            // Получаем путь к изображению товара
            const imagePath = path.resolve(__dirname, '../static', product.image);

            // Удаляем товар из базы данных
            await product.destroy();

            // Удаляем файл изображения
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Ошибка при удалении файла:', err);
                    return next(ApiError.internal('Ошибка при удалении файла'));
                } else {
                    console.log('Файл изображения успешно удален:', imagePath);
                }
            });

            return res.json({ message: 'Product and image deleted successfully' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async hideProduct(req, res, next) {
        try {
            const { id_product } = req.params;
            const product = await Product.findByPk(id_product);
            if (!product) {
                return next(ApiError.badRequest('Товар не найден'));
            }
            product.published = false;
            await product.save();
            return res.json({ message: 'Товар успешно скрыт!' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async unhideProduct(req, res, next) {
        try {
            const { id_product } = req.params;
            const product = await Product.findByPk(id_product);
            if (!product) {
                return next(ApiError.badRequest('Товар не найден'));
            }
            product.published = true;
            await product.save();
            return res.json({ message: 'Теперь товар видно в каталоге!' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    //Метод получения товаров
    async getAll(req, res) {
        let { id_brand, id_section, id_category, id_subcategory, limit, page, sort } = req.query;
        limit = parseInt(limit) || 12; // Определение значения по умолчанию для limit, если не указано в запросе
        page = parseInt(page) || 1; // Определение значения по умолчанию для page, если не указано в запросе
        let offset = (page - 1) * limit; // Вычисление смещения для корректной пагинации

        try {
            let whereClause = { published: true }; // Фильтр для выбора только опубликованных товаров

            // Применение фильтров к запросу в зависимости от переданных параметров
            if (id_section) whereClause.id_section = id_section;
            if (id_brand) whereClause.id_brand = id_brand;
            if (id_category) whereClause.id_category = id_category;
            if (id_subcategory) whereClause.id_subcategory = id_subcategory;

            let orderClause = [];
            // Определение порядка сортировки на основе параметра запроса sort
            if (sort === 'asc') {
                orderClause.push(['final_price', 'ASC']);
            } else if (sort === 'desc') {
                orderClause.push(['final_price', 'DESC']);
            }

            // Поиск и подсчет всех продуктов в соответствии с заданными условиями
            const products = await Product.findAndCountAll({
                where: whereClause,
                limit,
                offset,
                order: orderClause
            });

            return res.json(products);
        } catch (error) {
            console.error("Error fetching products:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getAllAdmin(req, res) {
    let { id_brand,id_section, id_category, id_subcategory, limit, page, sort } = req.query;
    limit = parseInt(limit) || 12;
    page = parseInt(page) || 1;
    let offset = (page - 1) * limit;

    try {
        
        let whereClause = {};
    
        if (id_section) whereClause.id_section = id_section;
        if (id_brand) whereClause.id_brand = id_brand;
        if (id_category) whereClause.id_category = id_category;
        if (id_subcategory) whereClause.id_subcategory = id_subcategory;

        let orderClause = [];
        if (sort === 'asc') {
            orderClause.push(['final_price', 'ASC']);
        } else if (sort === 'desc') {
            orderClause.push(['final_price', 'DESC']);
        }

        const products = await Product.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: orderClause
        });

        return res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
    }

    async getAllSale(req, res) {
        let { id_brand, limit, published, page, sort } = req.query;
        limit = parseInt(req.query.limit) || 12; // Устанавливаем значение по умолчанию в 12, если параметр не указан
        page = parseInt(req.query.page) || 1; // Устанавливаем значение по умолчанию в 1, если параметр не указан
        let offset = (page - 1) * limit; // Вычисляем смещение для пагинации
    
        try {
            let products;
            let whereClause = {
                sale: { [Op.gt]: 0 }// Фильтруем товары, у которых скидка больше нуля 
            };

            if (id_brand) whereClause.id_brand = id_brand;
            if (published) whereClause.published=published

            let orderClause = [];
            if (sort === 'asc') {
                orderClause.push(['final_price', 'ASC']); // Используем поле final_price для сортировки по возрастанию цены со скидкой
            } else if (sort === 'desc') {
                orderClause.push(['final_price', 'DESC']); // Используем поле final_price для сортировки по убыванию цены со скидкой
            }

            products = await Product.findAndCountAll({
                where: whereClause,
                limit,
                offset,
                order: orderClause
            });

            return res.json(products);
        } catch (error) {
            console.error("Error fetching products:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getAllNew(req, res) {
    let { id_brand, limit, published, page, sort } = req.query;
    limit = parseInt(req.query.limit) || 12; // Устанавливаем значение по умолчанию в 12, если параметр не указан
    page = parseInt(req.query.page) || 1; // Устанавливаем значение по умолчанию в 1, если параметр не указан
    let offset = (page - 1) * limit; // Вычисляем смещение для пагинации

    try {
        let products;
        let whereClause =  {new_status: true}
        
        if (id_brand) whereClause.id_brand = id_brand;
        if (published)whereClause.published = published

        let orderClause = [];
        if (sort === 'asc') {
            orderClause.push(['final_price', 'ASC']); // Используем поле final_price для сортировки по возрастанию цены со скидкой
        } else if (sort === 'desc') {
            orderClause.push(['final_price', 'DESC']); // Используем поле final_price для сортировки по убыванию цены со скидкой
        }

        products = await Product.findAndCountAll({
            where: whereClause,
            limit,
            published,
            offset,
            order: orderClause
        });

        return res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
    }

    async getOne(req,res){
        const{id_product}=req.params;
        const product=await Product.findOne(
        {
          where:{id_product},
          include:[{model:ItemInfo, as: 'itemInfo'}]
        },
      )
      return res.json(product)
    }

    async search(req, res, next) {
        const { query } = req.body;// Получаем поисковый запрос из параметров запроса

        if (!query) {
            return res.status(400).json({ message: 'Параметр "query" обязателен' });
        }

        try {
            const products = await Product.findAll({
                where: {
                    [Op.or]: [
                        { ru_product_name: { [Op.like]: `%${query}%` } },
                        { eng_product_name: { [Op.like]: `%${query}%` } }
                    ],
                    published: true // Исключаем скрытые товары
                }
            });

            return res.json(products);
        } catch (error) {
            console.error("Error searching products:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
 
}


module.exports=new ProductController()

