const express = require('express');
const app = express();
const port = 3000;
const PDFDocument = require('pdfkit');

app.get('/generate-pdf', function (req, res) {
    // Создаем новый PDF документ
    const doc = new PDFDocument();

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

    // Завершаем PDF и закрываем поток ответа
    doc.end();
});

app.listen(port, _ => {
    console.log(`Server is running on http://localhost:${port}`);
});