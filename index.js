const express = require('express');
const app = express();
const port = 3000;
const PDFDocument = require('pdfkit');

app.get('/generate-pdf', function (req, res) {
    // Создаем новый PDF документ
    const doc = new PDFDocument({
        size: 'A4',
        margin: 10
    });

    // Устанавливаем заголовок и тип содержимого для ответа
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');

    // Подключаем поток ответа к PDF документу
    doc.pipe(res);

    // Регистрация шрифтов
    doc.registerFont('ExtraLight', 'fonts/Nunito_Sans/NunitoSans_7pt-ExtraLight.ttf');
    doc.registerFont('Light', 'fonts/Nunito_Sans/NunitoSans_7pt-Light.ttf');
    doc.registerFont('Regular', 'fonts/Nunito_Sans/NunitoSans_7pt-Regular.ttf');
    doc.registerFont('Medium', 'fonts/Nunito_Sans/NunitoSans_7pt-Medium.ttf');
    doc.registerFont('SemiBold', 'fonts/Nunito_Sans/NunitoSans_7pt-SemiBold.ttf');
    doc.registerFont('Bold', 'fonts/Nunito_Sans/NunitoSans_7pt-Bold.ttf');
    doc.registerFont('ExtraBold', 'fonts/Nunito_Sans/NunitoSans_7pt-ExtraBold.ttf');
    doc.registerFont('Black', 'fonts/Nunito_Sans/NunitoSans_7pt-Black.ttf');

    doc.font('Regular');

    // Добавляем содержимое в PDF документ

    doc
        .fillColor('#94A3B8')
        .text('Исполнитель', 35, 30);

    doc.image('mock_images/avatar.png', 35, 55, {width: 30});

    doc
        .fillColor('#3F444A')
        .fontSize(16)
        .font('SemiBold')
        .text('Алексей Быков', 75, 58);

    doc
        .roundedRect(340, 30, 220, 60, 16)
        .strokeColor('#92E3A9')
        .stroke();

    doc
        .fontSize(14)
        .fillColor('#3F444A')
        .font('SemiBold')
        .text('Дата завершения осмотра', 350, 39);

    doc
        .fontSize(14)
        .fillColor('#50575E')
        .font('Medium')
        .text('10.06.2023', 350, 62);

    doc
        .fontSize(28)
        .fillColor('#09C18A')
        .font('Bold')
        .text('Место осмотра на карте', 35, 110);

    doc
        .fontSize(16)
        .fillColor('#3F444A')
        .font('Regular')
        .text('Адрес: Весновка, 41', 35, 160);

    doc.image('mock_images/map.png', 35, 190, {width: 525});

    doc
        .fontSize(28)
        .fillColor('#09C18A')
        .font('Bold')
        .text('Фотографии объекта', 35, 450);

    const photoSections = [
        {
            name: 'Фасад здания',
            images: 4
        },
        {
            name: 'Задний двор',
            images: 4
        },
        {
            name: 'Столовая',
            images: 5
        },
        {
            name: 'Сушилка',
            images: 6
        },
        {
            name: 'Уборная',
            images: 8
        },
        {
            name: 'Лестничный марш',
            images: 4
        },
        {
            name: 'Умывальня',
            images: 6
        },
        {
            name: 'Парилка',
            images: 6
        },
        {
            name: 'Бассейн',
            images: 4
        },
        {
            name: 'Техническая комната',
            images: 4
        }
    ];

    // Добавление изображений

    let title = {x: 35, y: 500},
        image = {x: 35, y: 530};

    photoSections.forEach(photoSection => {
        doc
            .fontSize(16)
            .fillColor('#3F444A')
            .font('SemiBold')
            .text(photoSection.name, title.x, title.y);

        for (let i = 0; i < photoSection.images; i++) {
            doc.image('mock_images/object-photo.png', image.x, image.y, {
                width: 125,
                height: 90
            });

            if ((i === 3 || i === 7 || i === 11 || i === 15) && photoSection.images > 4) {
                image.x = 35;
                image.y += 98;
                title.y += 98;
            } else {
                image.x += 133;
            }
        }

        if (image.y > 650) {
            doc.addPage();

            image.x = 35;
            image.y = 65;
            title.y = 35;
        } else {
            image.x = 35;
            image.y += 150;
            title.y += 150;
        }
    });

    doc.addPage();

    // Добавление прочей текстовой информации

    doc
        .fontSize(28)
        .fillColor('#09C18A')
        .font('Bold')
        .text('Акт осмотра недвижимости (квартира)', 35, 35);

    doc
        .fontSize(20)
        .fillColor('#09C18A')
        .font('SemiBold')
        .text('Адрес', 35, 130);

    doc.image('icons/location.png', 35, 165, {width: 20});

    doc
        .fontSize(14)
        .fillColor('#3F444A')
        .font('Regular')
        .text('г. Алматы, Торайгырова 12, д 10, кв. 3', 65, 167);

    doc
        .fontSize(12)
        .fillColor('#94A3B8')
        .font('Regular')
        .text('Граничащие и соседние улицы', 35, 220);

    doc
        .fontSize(14)
        .fillColor('#50575E')
        .font('Regular')
        .text('Весновка, Яблонева', 35, 240);

    doc
        .fontSize(12)
        .fillColor('#94A3B8')
        .font('Regular')
        .text('Историческое название района', 330, 220);

    doc
        .fontSize(14)
        .fillColor('#50575E')
        .font('Regular')
        .text('Весновка', 330, 240);

    doc
        .fontSize(12)
        .fillColor('#94A3B8')
        .font('Regular')
        .text('Доступность общественного транспорта', 35, 270);

    doc
        .fontSize(14)
        .fillColor('#50575E')
        .font('Regular')
        .text('Хорошая', 35, 290);

    doc
        .fontSize(12)
        .fillColor('#94A3B8')
        .font('Regular')
        .text('Ближайшие учебные учреждения', 330, 270);

    doc
        .fontSize(14)
        .fillColor('#50575E')
        .font('Regular')
        .text('Школа 12', 330, 290);

    doc
        .fontSize(12)
        .fillColor('#94A3B8')
        .font('Regular')
        .text('Ближайшие торговые и культурные центры', 35, 320, {
            width: 250
        });

    doc
        .fontSize(14)
        .fillColor('#50575E')
        .font('Regular')
        .text('ТРЦ Мега', 35, 360);

    doc
        .fontSize(12)
        .fillColor('#94A3B8')
        .font('Regular')
        .text('Состояние экологической зоны', 330, 320);

    doc
        .fontSize(14)
        .fillColor('#50575E')
        .font('Regular')
        .text('Хорошее', 330, 340);


    // Завершаем PDF и закрываем поток ответа
    doc.end();
});

app.listen(port, _ => {
    console.log(`Server is running on http://localhost:${port}`);
});