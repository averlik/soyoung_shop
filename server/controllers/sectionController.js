const {Sections}=require('../models/models')
const ApiError=require('../error/ApiError')
const { Op } = require('sequelize');

class SectionController{
    
    async create(req, res, next) {
        try {
            const { section_name } = req.body;
            const new_brand = await Sections.findOne({ where: { section_name } });
            if (new_brand) {
                return next(ApiError.badRequest('Такой раздел уже существует'));
            }
            const section = await Sections.create({ section_name });
            return res.json(section);
        } catch (error) {
            console.error('Ошибка при создании раздела:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
    
    async getAll(req,res){
        const section= await Sections.findAll()
        return res.json(section)
    }  

    async delete(req, res, next) {
        try {
            const { id_section } = req.params;
            const section = await Sections.findByPk(id_section);
            if (!section) {
                return next(ApiError.notFound('Раздел не найден'));
            }
            await section.destroy();
            return res.json({ message: 'Раздел успешно удален' });
        } catch (error) {
            console.error('Ошибка при удалении раздела:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async update(req, res, next) {
        try {
            const { id_section } = req.params;
            const { section_name } = req.body;
            let section = await Sections.findByPk(id_section);
            if (!section) {
                return next(ApiError.notFound('Раздел не найден'));
            }
            section.section_name = section_name;
            await section.save();
            return res.json(section);
        } catch (error) {
            console.error('Ошибка при обновлении раздела:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
    
     
}

module.exports=new SectionController()