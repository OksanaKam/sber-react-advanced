# Урок 1 — React, TypeScript и FSD

Выполнены базовая архитектура, сущность Task, список с фильтрацией и удалением,
страница TaskPage и виджет TaskWidget.

## Окружение и запуск

Используйте Node.js 22.12+ (ветка 22 указана в `.nvmrc`).
Если установлен nvm: `nvm install` и `nvm use` из этой папки.
Системный Node.js 20.13.1 слишком стар для установленного Vite.

Из корня репозитория:

```sh
cd lesson-1
npm ci
npm run dev
```

Откройте адрес, напечатанный Vite. `/` перенаправляет на `/tasks`.
На `/tasks` показан список задач с фильтрами и удалением,
остальные адреса показывают 404.

## Проверки

```sh
npm run check
npm run format
```

`check` запускает TypeScript и сборку Vite, ESLint и проверку Prettier.
`format` исправляет форматирование. Отдельно доступны `build`, `lint`,
`format:check`, а также `preview` для просмотра готовой сборки.

## Структура

```text
src/
  app/        # App.tsx, router.tsx, глобальные стили
  pages/      # TaskPage подключает виджет задач
  widgets/    # TaskWidget: обёртка списка и начальные данные
  features/   # taskList: useTasks, фильтры и удаление
  entities/   # тип Task и презентационный TaskCard с CSS-модулем
  shared/     # общие UI-компоненты и утилиты
  main.tsx    # точка входа React
```

Направление зависимостей: app → pages → widgets → features → entities → shared.
Слайсы одного слоя не импортируют друг друга. Внутри слайса разрешены
относительные импорты, снаружи используется публичный `index.ts`:

```ts
import { TaskPage } from 'pages/tasks';
```

ESLint с `eslint-plugin-boundaries` проверяет границы по разрешённым путям,
включая относительные импорты, и доступ к слайсам через публичный API.
App и Shared не разделены на слайсы, внутренние импорты в них разрешены.
Алиасы шести слоёв определены в `tsconfig.json`; `tsconfig.app.json` наследует
их, а Vite читает тот же список. Prettier отвечает за единый стиль кода,
`eslint-config-prettier` отключает конфликтующие правила ESLint.

Критерии всего задания и оставшиеся этапы — в `../LESSON-1.md`.
