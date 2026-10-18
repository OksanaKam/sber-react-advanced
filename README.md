# React Advanced — учебный проект

Один репозиторий на весь курс. Менеджер задач уроков 1–3 находится в `lesson-1-3/`.
Проект урока 4 с React Hook Form и Zod находится в `lesson-4/`.
Примеры useRef урока 5 находятся в `lesson-5/`.

- `main` — принятые работы и основа следующего урока.
- `lesson-N` — ветка урока N от актуальной `main`.
- Один pull request в `main` соответствует одному уроку.
- `LESSON-N.md` в корне содержит чек-лист, команды и ссылки на ключевые файлы.

Текущая ветка: `lesson-5`. Описание: [урок 5](LESSON-5.md). Результаты менеджера задач: [урок 1](LESSON-1.md),
[урок 2](LESSON-2.md), [урок 3](LESSON-3.md).

## Приложение — React, TypeScript и FSD

Выполнены базовая архитектура, сущность Task, список с фильтрацией и удалением,
страница TaskPage и виджет TaskWidget.

## Окружение и запуск

Используйте Node.js 22.12+ (ветка 22 указана в `lesson-1-3/.nvmrc`).
Если установлен nvm: `nvm install` и `nvm use` из папки `lesson-1-3`.
Системный Node.js 20.13.1 слишком стар для установленного Vite.

Из корня репозитория:

```sh
cd lesson-1-3
npm ci
npm run dev
```

Откройте адрес, напечатанный Vite. `/` перенаправляет на `/tasks`.
На `/tasks` показан список задач с фильтрами и удалением,
остальные адреса показывают 404.

## Проверки

Из папки `lesson-1-3`:

```sh
npm run check
npm run format
```

`check` запускает TypeScript и сборку Vite, ESLint и проверку Prettier.
`format` исправляет форматирование. Отдельно доступны `build`, `lint`,
`format:check`, а также `preview` для просмотра готовой сборки.

## Структура

```text
lesson-1-3/src/
  app/        # App.tsx, router.tsx, глобальные стили
  pages/      # TaskPage подключает виджет задач
  widgets/    # TaskWidget: вызов хука и передача props
  features/   # taskList: useTasks, фильтры и удаление
  entities/   # тип Task и презентационный TaskCard с CSS-модулем
  shared/     # общие UI-компоненты и утилиты
  main.tsx    # точка входа React
```

Направление зависимостей: app → pages → widgets → features → entities → shared.
Слайсы одного слоя не импортируют друг друга. Внутри слайса разрешены
относительные импорты, снаружи используется публичный `index.ts`:

```ts
import { TaskPage } from "pages/tasks";
```

ESLint с `eslint-plugin-boundaries` проверяет границы по разрешённым путям,
включая относительные импорты, и доступ к слайсам через публичный API.
App и Shared не разделены на слайсы, внутренние импорты в них разрешены.
Алиасы шести слоёв определены в `tsconfig.json`; `tsconfig.app.json` наследует
их, а Vite читает тот же список. Prettier отвечает за единый стиль кода,
`eslint-config-prettier` отключает конфликтующие правила ESLint.

Вызов `useTasks` находится в `TaskWidget`: виджет передаёт список, фильтр и обработчики в `TaskList` через props.
