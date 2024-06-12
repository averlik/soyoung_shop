require('dotenv').config() //загрузка переменных среды из файла .env в процесс приложения
const express = require('express');
const sequelize = require('./db');//настройки подключения к бд
const models=require('./models/models')// определения моделей базы данных
const cors=require('cors')
const router=require('./routes/index')//определение маршрутов
const errorHandler=require('./middleware/ErrorHandlingMiddleware')//поделючение файла middleware для обработки ошибок
const path= require('path');//модуль для работы с путями к файлам и каталогам в файловой системе
const fileUpload = require('express-fileupload');

const PORT=process.env.PORT||3000;

const app=express();//cоздается экземпляр приложения Express
app.use(cors())
//Подключаются необходимые middleware
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload({}))
app.use('/api', router)//Устанавливается маршрут для API

//Обработка ошибок, последний Middleware
app.use(errorHandler)

const start=async()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порте: ${PORT}`);
          });
    }
    catch(err){
        console.log('Ошибка:',err);
    }
};
start();

