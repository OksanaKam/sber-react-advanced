# LESSON-8 — Порталы в React

Ветка: `lesson-8`. База PR: `main`. Приложение находится в `lesson-8/`.

## Что сделано

### Tooltip

Подсказка появляется при наведении и исчезает при уходе курсора.
Содержимое передаётся через `content`, положение — через `position`.
Enum `TooltipPosition` описывает четыре варианта: сверху, снизу, слева и справа.
По умолчанию подсказка отображается снизу.

Кнопка остаётся внутри страницы, а подсказка рендерится через `createPortal`
в `#tooltip-root`. Координаты рассчитываются при наведении через
`getBoundingClientRect()`, отступ от элемента составляет 8 px.

### События и изоляция стилей

На демонстрационной странице кнопка находится внутри блока с `onClick`.
Клик по кнопке всплывает к родителю и увеличивает счётчик; клик по фону
блока также учитывается. Наведение открывает подсказку без изменения счётчика.

Для Tooltip используется CSS Module с собственными цветами и шрифтом.
Портал размещает подсказку вне DOM-контейнера родителя, а `pointer-events: none`
позволяет событиям мыши попадать в элементы под ней, не перехватывая клики.

### ConfirmDialog

Диалог рендерится через `createPortal` в `#dialog-root` и принимает заголовок
и описание. Хук `useConfirmDialog` предоставляет
`showConfirmDialog({ title, description })`, возвращающий `Promise<boolean>`.

«Подтвердить» завершает Promise значением `true`, «Отмена» и Escape — `false`.
Удаление в примере выполняется только после подтверждения.
Повторный вызов отменяет предыдущий запрос; при размонтировании ожидающий
Promise также завершается значением `false`.

Нативный `<dialog>` открывается через `showModal()`. Начальный фокус установлен
на «Отмена», при закрытии предусмотрен возврат фокуса к элементу открытия.
Стили диалога изолированы через CSS Module.

### PortalShowcase

Страница объединяет пример Tooltip, счётчик родительских кликов и кнопку
«Удалить», открывающую ConfirmDialog. После удаления можно восстановить пример.
`App` подключает страницу `PortalShowcase`.

Контейнеры порталов расположены в `lesson-8/index.html`: в Vite этот файл
находится в корне приложения, а не в `public/`.

## Чек-лист реализации

- [x] Tooltip с появлением и скрытием по наведению.
- [x] Рендер подсказки через портал и передача содержимого и позиции через props.
- [x] Демонстрация всплытия кликов к родителю.
- [x] Изоляция стилей Tooltip через CSS Module.
- [x] ConfirmDialog через портал с настраиваемыми заголовком и описанием.
- [x] Возврат результата подтверждения через `Promise<boolean>`.
- [x] Страница PortalShowcase с обоими порталами.
- [x] Проверка TypeScript, production-сборка и ESLint.

Выполнена основная часть задания. Бонус с ThemeContext не включён.

## Запуск и проверки

Из корня репозитория:

```sh
cd lesson-8
npm ci
npm run dev
```

Открыть адрес, который выведет Vite. Для окружения подойдёт Node.js 22.13+ ветки 22.

Проверки из папки `lesson-8`:

```sh
npm run build
npm run lint
```

Сборка и ESLint прошли.

## Ключевые файлы

- [Tooltip](lesson-8/src/shared/ui/Tooltip/Tooltip.tsx) и [позиции](lesson-8/src/shared/ui/Tooltip/TooltipPosition.ts).
- [Стили Tooltip](lesson-8/src/shared/ui/Tooltip/Tooltip.module.css).
- [ConfirmDialog](lesson-8/src/shared/ui/ConfirmDialog/ConfirmDialog.tsx) и [хук useConfirmDialog](lesson-8/src/shared/ui/ConfirmDialog/useConfirmDialog.ts).
- [Стили ConfirmDialog](lesson-8/src/shared/ui/ConfirmDialog/ConfirmDialog.module.css).
- [PortalShowcase](lesson-8/src/pages/portal-showcase/ui/PortalShowcase.tsx).
- [Контейнеры порталов](lesson-8/index.html).
- [Команды и зависимости](lesson-8/package.json), [lockfile](lesson-8/package-lock.json).
