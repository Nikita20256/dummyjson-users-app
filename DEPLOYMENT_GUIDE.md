# Инструкция по размещению на GitHub и GitHub Pages

## Шаг 1: Подготовка локального репозитория

```bash
cd "c:\рабочая папка\app"
git status
```

## Шаг 2: Добавить все файлы в git

```bash
git add .
git commit -m "Initial commit: DummyJSON Users Management App"
```

## Шаг 3: Создать репозиторий на GitHub

1. Перейти на https://github.com/new
2. Заполнить поля:
   - **Repository name**: `dummyjson-users-app` (или любое другое имя)
   - **Description**: "DummyJSON Users Management App" (опционально)
   - **Visibility**: Public
   - **Initialize this repository with**: оставить пусто
3. Нажать "Create repository"

## Шаг 4: Подключить удаленный репозиторий

После создания репозитория, GitHub покажет инструкции. Запустите:

```bash
git remote add origin https://github.com/ВАШ_ЛОГИН/dummyjson-users-app.git
git branch -M main
git push -u origin main
```

Замените `ВАШ_ЛОГИН` на ваш GitHub username.

## Шаг 5: Настроить GitHub Pages

1. Перейти в репозиторий на GitHub
2. Зайти в **Settings** → **Pages**
3. В разделе "Build and deployment":
   - **Source**: Выбрать "GitHub Actions"
   - Или использовать "Deploy from a branch" и выбрать `main` branch

## Шаг 6: Создать GitHub Actions workflow (рекомендуется)

Если вы выбрали GitHub Actions, создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build project
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

Создайте папку `.github/workflows/` и сохраните файл `deploy.yml` в неё.

Затем:

```bash
git add .github/
git commit -m "Add GitHub Actions workflow for deployment"
git push
```

## Шаг 7: Проверить развертывание

1. Перейти на страницу репозитория
2. Нажать на вкладку **Actions**
3. Дождаться завершения workflow (зелёная галочка ✓)
4. Перейти в **Settings** → **Pages**
5. Найти ссылку на развернутое приложение: `https://ВАШ_ЛОГИН.github.io/dummyjson-users-app/`

## Ссылки

- **GitHub**: https://github.com
- **GitHub Pages Docs**: https://pages.github.com
- **GitHub Actions Docs**: https://docs.github.com/en/actions

## Команды для быстрого старта

```bash
# Проверить статус
git status

# Добавить изменения
git add .

# Сделать commit
git commit -m "Your message here"

# Отправить на GitHub
git push

# Просмотреть историю
git log --oneline
```

## Возможные проблемы

### Приложение не загружается на GitHub Pages
- Проверьте, что `base: './'` в `vite.config.js`
- Убедитесь, что папка `dist` создана после `npm run build`
- Проверьте настройки Pages в Settings репозитория

### Компонеры не подгружаются
- Это может быть проблема с путями. Убедитесь, что используете относительные пути
- Проверьте консоль браузера (F12) на ошибки 404

### GitHub Actions не запускается
- Убедитесь, что файл `.github/workflows/deploy.yml` создан корректно
- Проверьте вкладку Actions на ошибки
