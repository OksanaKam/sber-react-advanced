# LESSON-3 — RTK Query и локальное состояние

Ветка: `lesson-3`. База PR: `main`. Приложение находится в корне репозитория.

## Что сделано

Задачи загружаются через RTK Query с
`https://jsonplaceholder.typicode.com/todos`. Endpoint `getTasks` возвращает
`Task[]` и экспортирует хук `useGetTasksQuery`. Сервер отдаёт массив напрямую,
поэтому `transformResponse` возвращает `response`, а не `response.todos`.
Идентификаторы задач имеют тип `number`.

В `useTasks` полученные данные копируются в локальное состояние через
`useEffect`. Отметка в `useRef` позволяет выполнить копирование один раз
за монтирование, после получения ответа, и не восстанавливать удалённые
задачи при последующих обновлениях данных запроса.

`TaskWidget` вызывает `useTasks` и передаёт задачи, фильтр и обработчики
в `TaskList`. Список отображает презентационные карточки `TaskCard`.
Функция `removeTask(id: number)` удаляет задачу только из локального состояния,
без запроса на сервер. После перезагрузки страницы задачи загружаются заново.
Сохранены `React.memo`, `useMemo` для фильтрации и `useCallback` для удаления.

Бонус: общий `baseApi` находится в `shared/api`, содержит `reducerPath: 'api'`,
`fetchBaseQuery` с адресом сервера и `tagTypes: ['Tasks']`.
Модуль `tasksApi` добавляет `getTasks` через `baseApi.injectEndpoints`.
В store один раз подключены `baseApi.reducer` и `baseApi.middleware`,
а приложение обёрнуто в Redux `Provider`.

## Чек-лист

- [x] Настроить API и endpoint `getTasks` с `transformResponse`.
- [x] Экспортировать и использовать `useGetTasksQuery` в `useTasks`.
- [x] Скопировать загруженные данные в `useState` через `useEffect`.
- [x] Отобразить задачи через `TaskList` и `TaskCard`.
- [x] Реализовать локальное удаление по числовому ID без серверного запроса.
- [x] Проверить загрузку, отображение и удаление в браузере.
- [x] Создать общий `baseApi` и подключить задачи через `injectEndpoints`.
- [x] Подключить общий reducer и middleware один раз.
- [x] Выполнить проверку TypeScript, сборку, ESLint и Prettier.

## Запуск и проверки

Node.js: `^20.19.0 || >=22.12.0`; `.nvmrc` выбирает ветку 22.
Команды выполняются из корня репозитория:

```sh
nvm use
npm ci
npm run dev
```

Страница приложения: `/tasks`. Для загрузки задач нужен доступ к JSONPlaceholder.

```sh
npm run build
npm run lint
npm run format:check
```

Общая проверка: `npm run check`. TypeScript, сборка, ESLint и Prettier проходят успешно.

## Ключевые файлы

- [baseApi](src/shared/api/baseApi.ts) — общие настройки RTK Query.
- [tasksApi](src/entities/task/api/tasksApi.ts) — endpoint задач и хук запроса.
- [Task](src/entities/task/model/types.ts) — тип задачи.
- [store](src/app/store/store.ts) — подключение reducer и middleware.
- [main.tsx](src/main.tsx) — Redux Provider.
- [useTasks](src/features/taskList/model/useTasks.ts) — загрузка, локальное состояние, фильтрация и удаление.
- [TaskWidget](src/widgets/task/ui/TaskWidget.tsx) — вызов хука и передача props.
- [TaskList](src/features/taskList/ui/TaskList.tsx) — список задач.
- [TaskCard](src/entities/task/ui/TaskCard.tsx) — карточка задачи.
- [package.json](package.json) — зависимости, скрипты и окружение.
- [package-lock.json](package-lock.json) — зафиксированные зависимости.
