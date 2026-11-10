# LESSON-7 — Сборка через esbuild и SWC

Ветка: `lesson-7`. База PR: `main`. Проект находится в `lesson-7/build-hw/`.

## Что сделано

Приложение собирается через esbuild в `dist/app.js`. Неиспользуемая функция
`unused` из `utils.ts` удаляется благодаря tree shaking. Страницы Home и About
загружаются через `routes.ts` по нажатию соответствующей кнопки. Каждая страница
попадает в отдельный чанк и не загружается при старте приложения.

Библиотека имеет три точки входа: `index.ts`, `math.ts` и `string.ts`.
esbuild создаёт ESM-файлы в `dist/lib/esm` и CommonJS-файлы в `dist/lib/cjs`.
React и lodash используются в библиотеке и исключены из бандлов через `external`.

Флаг `--dev` включает watch и отключает минификацию. Без флага выполняется
однократная production-сборка с минификацией, tree shaking и sourcemap.
Для библиотеки watch работает для обоих форматов.

Бонусная сборка через SWC преобразует каждый TypeScript-файл библиотеки отдельно
в ESM (`module.type: 'es6'`) и CommonJS (`module.type: 'commonjs'`).
Включены `minify` и `sourceMaps`. Результаты находятся в `dist/swc/esm`
и `dist/swc/cjs`; создаваемые в этих папках `package.json` определяют формат
файлов `.js` и позволяют сохранить относительные импорты.

## Чек-лист

- [x] Сборка приложения с `bundle`, минификацией и sourcemap.
- [x] Удаление неиспользуемого кода через tree shaking.
- [x] Динамические импорты и отдельные чанки страниц Home/About.
- [x] Три точки входа библиотеки в форматах ESM и CommonJS.
- [x] React и lodash остаются внешними зависимостями.
- [x] Dev-режим с watch без минификации; production-режим с минификацией.
- [x] Бонус: сборка библиотеки через SWC в двух форматах.
- [x] Бонус: загрузка страниц только при выборе соответствующего маршрута.

## Установка и запуск

Из корня репозитория:

```sh
cd lesson-7/build-hw
npm ci
npm run build:app
```

Открыть `lesson-7/build-hw/index.html` через **Open with Live Server** в VS Code.
Кнопки Home и About загружают модули страниц и отображают их содержимое.

Команды из `lesson-7/build-hw`:

| Команда | Назначение |
| --- | --- |
| `npm run dev:app` | Наблюдение за изменениями приложения |
| `npm run build:app` | Production-сборка приложения |
| `npm run dev:lib` | Наблюдение за изменениями библиотеки, ESM и CJS |
| `npm run build:lib` | Production-сборка библиотеки через esbuild |
| `npm run build:swc` | Сборка библиотеки через SWC |
| `npx tsc --noEmit` | Проверка типов приложения, библиотеки и конфигов |

Перед production-сборкой остановить соответствующий watch через `Ctrl+C`.
Папка `dist` генерируется сборщиками и не хранится в Git.

## Проверки

Проверка типов и все три production-сборки проходят. Проверены автоматическая
пересборка приложения и обоих форматов библиотеки, загрузка экспортов через
`import` и `require`, работа функций и создание sourcemap.
Программная проверка собранного приложения подтверждает отсутствие загрузки
страниц при старте и загрузку отдельных чанков при вызове обработчиков кнопок.

## Ключевые файлы

- [Конфиг приложения esbuild](lesson-7/build-hw/configs/esbuild.app.config.ts).
- [Конфиг библиотеки esbuild](lesson-7/build-hw/configs/esbuild.lib.config.ts).
- [Конфиг библиотеки SWC](lesson-7/build-hw/configs/swc.lib.config.ts).
- [Приложение](lesson-7/build-hw/app/index.ts) и [маршруты](lesson-7/build-hw/app/routes.ts).
- [Библиотека](lesson-7/build-hw/lib/index.ts).
- [HTML-страница](lesson-7/build-hw/index.html).
- [Настройки TypeScript](lesson-7/build-hw/tsconfig.json).
- [Команды и зависимости](lesson-7/build-hw/package.json), [lockfile](lesson-7/build-hw/package-lock.json).
