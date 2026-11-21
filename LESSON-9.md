# LESSON-9 — Новые хуки React 19

Ветка: `lesson-9`. База PR: `main`. Приложение находится в `lesson-9/`.

## Что сделано

### FormWithAsyncSave

Форма сохраняет введённый текст через `useActionState`. Асинхронная операция
имитируется задержкой в одну секунду. UI отображает `idle`, `saving`, `success`.
Состояние ожидания определяется через `isPending`, результат — через состояние хука.
После успешной отправки React автоматически очищает неконтролируемое поле.
При новом вводе действие возвращает `initialState`, сбрасывая статус успеха.

### TodoListOptimistic

`useOptimistic` добавляет задачу в отображаемый список до завершения сохранения.
Через секунду `useActionState` возвращает обновлённый список сохранённых задач.
Временное обновление заменяется сохранёнными данными с тем же идентификатором.
Пустые задачи не добавляются. На время сохранения повторная отправка заблокирована,
после завершения поле очищается.

### ActionStateWithReducer — бонус

Форма содержит поля имени и email. Кастомный редюсер передан в `useActionState`
и обрабатывает действия `change` и `save`. При вводе состояние меняется на `dirty`,
после сохранения обоих полей — на `success`. Начальное состояние — `idle`.
Ожидание действия отображается как `submitting` через `isPending`.
Сохранение имитируется задержкой в одну секунду, после отправки поля очищаются.

Все три примера подключены на странице `MainPage`. Общие стили компонентов
вынесены в CSS Module. Запросы к внешнему API не выполняются;
данные хранятся в памяти приложения. React Compiler не подключён.

## Чек-лист реализации

- [x] Асинхронная форма с `useActionState` и отображением статусов.
- [x] Автоматическая очистка полей после успешного действия формы.
- [x] Мгновенное добавление задачи через `useOptimistic`.
- [x] Сохранение задачи без дублирования оптимистичной записи.
- [x] Бонусная форма с несколькими полями и кастомным редюсером.
- [x] Проверка TypeScript, production-сборка и ESLint.

## Запуск и проверки

Проверено на Node.js 22.23.3.

Из корня репозитория:

```sh
cd lesson-9
npm ci
npm run dev
```

Открыть адрес, который выведет Vite.

Проверки из папки `lesson-9`:

```sh
npm run build
npm run lint
```

Сборка с проверкой TypeScript и ESLint прошли.

## Ключевые файлы

- [FormWithAsyncSave](lesson-9/src/features/react19Examples/FormWithAsyncSave.tsx).
- [TodoListOptimistic](lesson-9/src/features/react19Examples/TodoListOptimistic.tsx).
- [ActionStateWithReducer](lesson-9/src/features/react19Examples/ActionStateWithReducer.tsx).
- [Общие стили](lesson-9/src/features/react19Examples/React19Examples.module.css).
- [MainPage](lesson-9/src/pages/main-page/ui/MainPage.tsx).
- [App](lesson-9/src/app/App.tsx).
- [Команды и зависимости](lesson-9/package.json), [lockfile](lesson-9/package-lock.json).
