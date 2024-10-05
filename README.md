
# XMLTV EPG

Это приложение Node.js для извлечения и обработки данных электронного программного гида (EPG) из нескольких источников. Приложение генерирует XML-файл с данными телепрограммы и сжимает его в формат .gz.

## 📋 Предварительные настройки

1. Настроить два JSON-файла: `sources.json` и `channels.json`.

### Пример `sources.json`:
```json
{
  "sources": {
    "edem": "https://epg.lampa.stream/edem/epg/$id.json",
    "iptvx": "https://epg.iptvx.one/api/id/$id.json"
  }
}
```

### Пример `channels.json`:
```json
{
  "edem": {
    "12": {
      "name": "Родное Кино",
      "logo": "http://epg.one/img2/12.png"
    },
    "18": {
      "name": "Рен ТВ FHD",
      "logo": "http://epg.one/img2/2487.png"
    }
  },
  "iptvx": {
    "nasha-sibir-4k":{
    "name": "Наша Сибирь 4K",
    "logo": "https://iptvx.one/picons/nasha-sibir.png"
  },
  "magic-thriller": {
    "name": "Magic Thriller",
    "logo": "https://iptvx.one/picons/magic-thriller.png"
   }
  }
}
```

Эти файлы содержат источники и каналы, для которых нужно собрать данные EPG. В каждом источнике задаются уникальные каналы с их ID, названием и ссылкой на логотип.

## 🛠️ Установка зависимостей

1. Убедиться, что установлен [Node.js](https://nodejs.org/).
2. Выполнить команду для установки всех необходимых зависимостей:
   ```bash
   npm install
   ```

## 🚀 Запуск скрипта

1. Убедиться, что установлен [Node.js](https://nodejs.org/).
2. Выполнить команду для установки всех необходимых зависимостей:
   ```bash
   npm install
   ```
3. Запустить скрипт с помощью команды:
   ```bash
   node main.js
   ```

## 📦 Упаковка в контейнер Docker

1. Убедиться, что установлен [Docker](https://www.docker.com/).
2. Соберать образ, выполнив команду:
   ```bash
   docker build -t xmltv_epg .
   ```
3. Запустите контейнер:
   ```bash
   docker run -it --rm xmltv_epg
   ```

