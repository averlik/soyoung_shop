require('dotenv').config();
const fs = require('fs');
const { exec } = require('child_process');
const cron = require('node-cron');

// Параметры базы данных из переменных окружения
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USERNAME;
const DB_PASS = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Параметры резервного копирования
const BACKUP_DIR = './backups'; // Убедитесь, что эта директория существует
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR);
}
const DATE = new Date().toISOString().slice(0, 19).replace(/[-T:]/g, '');
const BACKUP_FILE = `${BACKUP_DIR}/${DB_NAME}_${DATE}.sql`;

// Полный путь к mysqldump
const MYSQLDUMP_PATH = 'C:\\xampp\\mysql\\bin\\mysqldump';

function backupDatabase() {
    const dumpCommand = `${MYSQLDUMP_PATH} -h ${DB_HOST} -u ${DB_USER} ${DB_PASS ? '-p' + DB_PASS : ''} ${DB_NAME} > ${BACKUP_FILE}`;

    exec(dumpCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Ошибка резервного копирования: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`Ошибка stderr: ${stderr}`);
            return;
        }

        console.log(`Резервное копирование успешно выполнено: ${BACKUP_FILE}`);

        // Опционально: Удаление старых резервных копий (старше 7 дней)
        const files = fs.readdirSync(BACKUP_DIR);
        const now = new Date();

        files.forEach(file => {
            const filePath = `${BACKUP_DIR}/${file}`;
            const stats = fs.statSync(filePath);
            const fileDate = new Date(stats.mtime);

            if ((now - fileDate) / (1000 * 60 * 60 * 24) > 7) { // 7 дней
                fs.unlinkSync(filePath);
                console.log(`Удален старый файл резервной копии: ${file}`);
            }
        });
    });
}

// Запланировать задачу на каждый день в 2 часа ночи
cron.schedule('0 19 * * *', backupDatabase);

// Вызвать backupDatabase сразу для проверки
backupDatabase();
