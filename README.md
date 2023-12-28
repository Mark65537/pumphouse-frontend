<h1 align="center"><img src="https://vuejs.org/logo.svg" height="32"/> Водокачка+ <img src="https://vuejs.org/logo.svg" height="32"/></h1>
<h2 align="center">Vue + Laravel</h2>
<h3 align="center">Приложение представляет собой небольшую АИС, в который вы как хозяин водокачки можете заносить и изменять показания счётчика, изменять цену воды за кубометр и добавлять новых пользователей к вашему огороду</h3>
<h3 align="center">Приложение же в свою очередь отображает в таблице занесённых вами пользователей, а так же выводит таблицу биллинга в которой 
производит расчёты сколько каждый дачник должен вам заплатить за прошлый месяц в зависимости от тарифа и потребления воды.
Вводная информация находится в <a href="https://github.com/Mark65537/pumphouse-frontend/blob/master/README_introductory.MD">README_introductory.MD</a></h3>

## Инструкция по запуску
Для запуска проекта вам понадобится <a href="https://nodejs.org/en">Node.js</a> и проект с <a href="https://github.com/Mark65537/pumphouse-backend">backend</a>, который содержит API.

Клонируйте репозиторий себе:

```sh
git clone https://github.com/Mark65537/pumphouse-backend
```

Запустите проект backend для доступа к API.
Инструкция как это сделать находиться в <a href="https://github.com/Mark65537/pumphouse-backend/README.MD">README</a>
проекта с backend.
После того как проект backend запущен, можете запускать
проект frontend, для этого можно использовать файл 
`ZZ) RUN.bat`, который сразу откроет ссылку на нужную страницу
и запустит сервер, или использовать команду
```bat
npm run serve
```
Если все удачно скомпилируется, то вы увидете адрес на 
котором запущен ваш проект.
## Инструкция по использованию
Есть две страницы Домашняя страница и Страница входа.

### Домашняя страница:
Домашняя страница работает в двух режимах: режим Администратора и режим пользователя. В режиме Администратора есть возможность изменять текущую дату, изменять тариф за текущий и последующие месяца, подавать показания за прошлый месяц, а так же редактировать список дачников(создавать, обновлять, удалять). В режиме пользователя возможен только просмотр данных в таблицах. На домашней странице находяться 3 таблицы: Список Билллинга, Список дачников и данные о тарифах. Изначально данные есть только в таблице дачников и тарифах, но после передачи тарифа и показаний Администратором, формируется таблица Биллинга.
Если таблица Биллинга не сформировалась после подачи показаний, попробуйте обновить страницу.

### Страница входа:
Для входа в систему нужно нажать кнопку "Вход" на вехней панели. После нажатия вы переедете на страницу входа. На данный 
момент вы можете войти только под администратором системы.

## Сборка проекта

Для сборки проекта можете использовать файл 
`Z) BUILD.bat` или команду:
```sh
npm run build
```