const fs = require('fs');
const axios = require('axios');
const zlib = require('zlib');

const sourcesFile = 'sources.json';
const channelsFile = 'channels.json';
const outputFile = 'epg.xml';
const compressedFile = 'epg.xml.gz';

// Функция для преобразования времени из Unix в нужный формат
function formatTime(unixTime) {
    const date = new Date(unixTime * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}00 +0300`;
}

// Функция для обработки EPG
async function fetchEPG(sourceName, sourceUrl, channelId) {
    try {
        const response = await axios.get(sourceUrl.replace('$id', channelId));
        const programmes = response.data.epg_data;

        if (!programmes) {
            throw new Error(`No programmes found for channel ${channelId}`);
        }

        let xmlContent = '';
        programmes.forEach(program => {
            const startTime = formatTime(program.time);
            const stopTime = formatTime(program.time_to);
            const title = program.name || '';
            const desc = program.descr ? program.descr.replace(/<br\s*\/?>/g, '') : '';
            const category = program.category || '';

            xmlContent += `<programme start="${startTime}" stop="${stopTime}" channel="${channelId}">\n`;
            xmlContent += `\t<title lang="ru">${title}</title>\n`;
            if (desc) {
                xmlContent += `\t<desc lang="ru">${desc}</desc>\n`;
            }
            if (category) {
                xmlContent += `\t<category lang="ru">${category}</category>\n`;
            }
            xmlContent += `</programme>\n`;
        });

        return xmlContent;
    } catch (error) {
        console.error(`Error fetching data for channel ${channelId}:`, error.message);
        return ''; // Возвращаем пустую строку в случае ошибки
    }
}

// Основной процесс
async function processEPG() {
    const sourcesData = JSON.parse(fs.readFileSync(sourcesFile, 'utf8'));
    const channelsData = JSON.parse(fs.readFileSync(channelsFile, 'utf8'));

    let allPrograms = '<?xml version="1.0" encoding="utf-8" ?>\n<tv>\n';

    // Добавляем конфигурацию всех каналов
    for (const [sourceName, channelEntries] of Object.entries(channelsData)) {
        for (const [channelId, channelInfo] of Object.entries(channelEntries)) {
            allPrograms += `<channel id="${channelId}">\n`;
            allPrograms += `\t<display-name lang="ru">${channelInfo.name}</display-name>\n`;
            allPrograms += `\t<icon src="${channelInfo.logo}" />\n`;
            allPrograms += `</channel>\n`;
        }
    }

    // Затем добавляем программы
    for (const [sourceName, sourceUrl] of Object.entries(sourcesData.sources)) {
        const channelEntries = channelsData[sourceName];

        for (const [channelId] of Object.entries(channelEntries)) {
            const xmlContent = await fetchEPG(sourceName, sourceUrl, channelId);
            if (xmlContent) {
                allPrograms += xmlContent;
            } else {
                console.log(`Skipping channel ${channelId} due to no program data.`);
            }
        }
    }

    allPrograms += '</tv>';

    fs.writeFileSync(outputFile, allPrograms, { flag: 'w' });
    console.log(`EPG data saved to ${outputFile}`);

    // Сжимаем файл в .gz
    const compressedData = zlib.gzipSync(allPrograms);
    fs.writeFileSync(compressedFile, compressedData);
    console.log(`EPG data compressed and saved to ${compressedFile}`);
}

// Запуск основного процесса
processEPG().catch(err => {
    console.error('Error in processing EPG:', err);
});
