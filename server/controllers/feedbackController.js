const { Feedback } = require('../models/models');
const ApiError = require('../error/ApiError');

class FeedbackController {
    
    async create(req, res, next) {
        try {
            const { email, text } = req.body;
            const feedback = await Feedback.create({ email, text });
            return res.json(feedback);
        } catch (error) {
            console.error('Ошибка при отправке сообщения', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
    
    // Получение всех отзывов
    async getAll(req, res) {
        try {
            const feedbacks = await Feedback.findAll();
            return res.json(feedbacks);
        } catch (error) {
            console.error('Ошибка при получении всех сообщений:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    } 

    // Удаление отзыва по ID
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const feedback = await Feedback.findByPk(id);
            if (!feedback) {
                return next(ApiError.notFound('Сообщение не найдено'));
            }
            await feedback.destroy();
            return res.json({ message: 'Сообщение успешно удалено' });
        } catch (error) {
            console.error('Ошибка при удалении сообщения:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}

module.exports = new FeedbackController();
