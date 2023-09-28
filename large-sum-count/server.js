const express = require('express');
const app = express();

// Middleware для добавления заголовка Cross-Origin-Embedder-Policy к статическим файлам
app.use(express.static('public', {
  setHeaders: (res) => {
    res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  }
}));

// Здесь 'public' - это директория, в которой находятся ваши статические ресурсы (HTML, CSS, JavaScript и др.)

// Остальной код вашего сервера
const port = 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
