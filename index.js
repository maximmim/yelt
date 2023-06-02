const express = require("express");
const fs = require("fs");
const app = express();

const filePath = 'bd.json';

// Проверяем наличие файла
fs.access(filePath, fs.constants.F_OK, (err) => {
  if (err) {
    // Файл не существует, создаем новый
    const data = [];
    const jsonData = JSON.stringify(data, null, 2);

    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        console.error('Произошла ошибка при создании файла:', err);
      } else {
        console.log('Файл bd.json успешно создан.');
      }
    });
  } else {
    console.log('Файл bd.json уже существует.');
  }
});

app.use(express.json()); // Добавьте эту строку для разбора тела запроса в формате JSON

app.get("/", (req, res) => {
  res.redirect("/html/index.html"); // Перенаправление на страницу "menu.html"
});

app.get("*", (req, res) => {
  console.log(`Запрошенный адрес: ${req.url}`);

  const filePath = req.url.substr(1);
  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (err) {
      res.status(404).send("Resource not found!");
    } else {
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

function saveDataToFile(data) {
  const jsonData = JSON.stringify(data);

  fs.writeFile('bd.json', jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Произошла ошибка при сохранении данных:', err);
    } else {
      console.log('Данные успешно сохранены в файл bd.json');
    }
  })
}

app.post('/get', (req, res) => {
  console.log(req.body);
  res.json({ message: 'Данные успешно получены на сервер' });

  // Функция для сохранения данных в файл JSON
  // Пример данных для сохранения
  // Вызов функции для сохранения данных
  saveDataToFile(req.body);
});

app.listen(3000, () => {
  console.log("Server started at 3000");
});
