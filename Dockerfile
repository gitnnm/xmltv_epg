# Используем базовый образ Node.js
FROM node:20

# Создаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Устанавливаем утилиты для скачивания и распаковки
RUN apt-get update && apt-get install -y curl unzip

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем файлы проекта в контейнер
COPY . .

# Устанавливаем PM2 глобально
RUN npm install -g pm2

# Открываем порт 80 для доступа к приложению
EXPOSE 80

CMD ["node", "server.js"]
