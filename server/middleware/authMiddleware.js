const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") { // Проверка, если метод запроса OPTIONS
        next() // Передача управления следующему middleware
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Извлечение токена из заголовка авторизации
        if (!token) { 
            return res.status(401).json({message: "Не авторизован"}) 
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Декодирование токена с использованием секретного ключа
        req.user = decoded; // Добавление информации о пользователе к объекту запроса req
        next(); 
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
};