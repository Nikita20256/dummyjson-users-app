# DummyJSON Users Management App

Приложение для просмотра, фильтрации и сортировки списка пользователей из API DummyJSON.

## Структура проекта

```
src/
├── App.jsx              # Главный компонент приложения
├── main.jsx             # Точка входа
├── components/
│   ├── Table/           # Компоненты таблицы
│   ├── Modal/           # Модальное окно профиля
│   ├── Filters/         # Компоненты фильтров
│   └── Pagination/      # Компонент пагинации
├── hooks/
│   └── useUsers.js      # Кастомный хук для работы с данными
├── services/
│   └── usersApi.js      # Сервис для работы с API
└── styles/
    └── global.css       # Глобальные стили
```