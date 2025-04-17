# Tonkoapp Proxy

Этот репозиторий — это Node.js-прокси для твоего Google Apps Script, развёрнутый через [Vercel](https://vercel.com).

## Использование

1. Разверни этот проект на GitHub
2. Подключи GitHub к Vercel и задеплой
3. Укажи `.env` переменную `GOOGLE_SCRIPT_URL` с адресом твоего GAS Web App
4. После деплоя твой URL на Vercel будет работать как прокси

Пример запроса:
```js
fetch("https://tonkoapp.vercel.app", {
  method: "POST",
  body: JSON.stringify({ name: "Мая" }),
  headers: { "Content-Type": "application/json" }
})
```
