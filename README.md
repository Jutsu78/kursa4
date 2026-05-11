# kursa4
project for KPI

Цей проект виконав студент 1 курсу КПІ ім. Сікорського, Тараєв Олексій 

Тема курсової: «Система моніторингу та обробки фінансових транзакцій (або котирувань криптовалют) у реальному часі»

Мета: навчитися реалізовувати системи маніторингу, та вцілому покращити свої навички в програмуванні.

Стек технологій
JavaScript (Node.js)
Pino.js (логгер)

Основний Реалізований Функціонал
Генерація даних Потік транзакцій у реальному часі через асинхронні ітератори
Оптимізація Мемоізація обчислень для повторюваних операцій конвертації
Пріоритезація Обробка транзакцій з використанням черги з пріоритетами (Priority Queue)
Архітектура Використання патернів Proxy, Strategy, Decorator та Dependency Injection
Моніторинг Реактивна система подій та багаторівневе логування

Як запустити?
Основним файлом що об'єднує всі компоненти системи є app.js
Запуск всієї системи:npm start

Завдяки архітектурній ізоляції ви можете запустити будь-який модуль окремо для тестування
це робиться звичайним методом ноди node src/...

гайд по структурі відповідності курсової до лабораторних робіт

src/app.js- Головна точка входу.

Лаба 1 src/transactionGenerator.js- Логіка генерації даних.
Лаба 3 src/memoization.js- Кешування результатів обчислень , конвертація валют.
Лаба 4 src/priorityQueue.js- Структура даних для пріоритетної обробки.
Лаба 5 src/filter.js- Асинхронна фільтрація потоку, робота з колбеками та промісами .
Лаба 6 src/stream.js- Робота з асинхронними стрімами.
Лаба 7 src/eventEmitter.js- Реактивна система подій.
Лаба 8 Модулі 8.1- 8.6 (Proxy, Strategy, API Service).
Лаба 9 Модулі 9.1- 9.3 (Декоратори та логування).


This project was completed by a 1st-year student of Igor Sikorsky KPI, Oleksii Taraiev

Course project topic: "Real-time monitoring and processing system for financial transactions (or cryptocurrency quotes)"

Goal: to learn how to implement monitoring systems, and overall improve my programming skills.

Technology stack
JavaScript (Node.js)
Pino.js (logger)

Main done functionality:
Data Generation Real-time transaction streaming using async iterators.
Optimization Computation memoization for repetitive conversion operations.
Prioritization Transaction processing using a Priority Queue.
Architecture Implementation of Proxy, Strategy, Decorator, and Dependency Injection patterns.
Monitoring Reactive event system and multi-level logging.


How to run?
The main entry point that integrates all system components is app.js.

Thanks to architectural isolation, you can run any module independently for testing purposes:
do this with def command node src/...

Guide to the structure of the courseproject in relation to the labs
src/app.js- Main Entry Point.
1 lab-src/transactionGenerator.js- Data generation logic. 
3 lab-src/memoization.js- results caching, currency convertation.
4 lab-src/priorityQueue.js- Priority Queue data structure.
5 lab-src/filter.js- Async stream filtering, work with callbacks and promises.
6 lab-src/stream.js- Async streams handling.
7 lab-src/eventEmitter.js- Reactive event system.
8 lab Modules 8.1 – 8.6 (Proxy, Strategy, API Service).
9 lab Modules 9.1 – 9.3 (Decorators and Logging).