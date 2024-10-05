
# EPG Processor

This is a Node.js application for fetching and processing Electronic Program Guide (EPG) data from multiple sources. The application generates an XML file with TV program data and compresses it into a .gz format.

## 📋 Предварительные настройки

1. Создайте два JSON-файла: `sources.json` и `channels.json`.

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
    "16": {
      "name": "Доктор",
      "logo": "http://epg.one/img2/16.png"
    },
    "18": {
      "name": "Рен ТВ FHD",
      "logo": "http://epg.one/img2/2487.png"
    }
  },
  "iptvx": {
    "rtr-belarus": {
      "name": "РТР-Беларусь",
      "logo": "https://dl.dropboxusercontent.com/s/8byzpjdsv8owypa/Viasat_Kino_Comedy.png"
    },
    "muvitv": {
      "name": "Муви ТВ",
      "logo": "https://dl.dropboxusercontent.com/s/8byzpjdsv8owypa/Viasat_Kino_Comedy.png"
    }
  }
}
```

Эти файлы содержат источники и каналы, для которых нужно собрать данные EPG. В каждом источнике задаются уникальные каналы с их ID, названием и ссылкой на логотип.

## 🛠️ Установка зависимостей

1. Убедитесь, что у вас установлен [Node.js](https://nodejs.org/).
2. Выполните команду для установки всех необходимых зависимостей:
   ```bash
   npm install
   ```

## 🚀 Запуск скрипта

1. Убедитесь, что у вас установлен [Node.js](https://nodejs.org/).
2. Установите зависимости, выполнив команду:
   ```bash
   npm install
   ```
3. Запустите скрипт с помощью команды:
   ```bash
   node main.js
   ```

## 📦 Упаковка в контейнер Docker

1. Убедитесь, что у вас установлен [Docker](https://www.docker.com/).
2. Соберите образ, выполнив команду:
   ```bash
   docker build -t epg-processor .
   ```
3. Запустите контейнер:
   ```bash
   docker run -it --rm epg-processor
   ```

