# kursa4
project for KPI

Цей проект виконав студент 1 курсу КПІ ім. Сікорського, Тараєв Олексій 

Тема курсової: «Система моніторингу та обробки фінансових транзакцій (або котирувань криптовалют) у реальному часі»

Мета: навчитися реалізовувати системи маніторингу, та вцілому покращити свої навички в програмуванні.

Стек технологій
JavaScript (Node.js)
Pino.js (логгер)

Основний запланований функціонал: 
 Генерація потоку даних у реальному часі.
 Оптимізація обчислень (кешування).
 Черга з пріоритетами для обробки транзакцій.
 Логування подій та базовий захист доступу.

Як запустити?
Для запуску генератора транзакцій відкрийте термінал у кореневій папці проєкту та виконайте команду
npm start
для запуску фільтрації підозрілих транзакцій (filter.js) треба написати команду node src/filter.js
це треба зробити тому що вона не інтегрована в кореневий файл генератора 
файли src/stream.js та src/eventEmitter.js покищо також є самостійними і запусаються окремо 


гайд по структурі відповідності курсової до лабораторних робіт
1 лаба-src/transactionGenerator.js
3 лаба-src/memoization.js
4 лаба-src/priorityQueue.js
5 лаба-src/filter.js
6 лаба-src/stream.js
7 лаба-src/eventEmitter.js


This project was completed by a 1st-year student of Igor Sikorsky KPI, Oleksii Taraiev

Course project topic: "Real-time monitoring and processing system for financial transactions (or cryptocurrency quotes)"

Goal: to learn how to implement monitoring systems, and overall improve my programming skills.

Technology stack
JavaScript (Node.js)
Pino.js (logger)

Main planned functionality:
Real-time data stream generation.
Computation optimization (caching).
Priority queue for transaction processing.
Event logging and basic access protection.

How to run?
To start the transaction generator, open the terminal in the root directory of the project and run the following command
npm start
To run the suspicious transaction filter (filter.js), you need to enter the command node src/filter.js
This is necessary because it is not integrated into the generator’s root file 
Currently, the src/stream.js and src/eventEmitter.js modules are standalone and executed independently.

Guide to the structure of the courseproject in relation to the labs
1 lab-src/transactionGenerator.js
3 lab-src/memoization.js
4 lab-src/priorityQueue.js
5 lab-src/filter.js
6 lab-src/stream.js
7 lab-src/eventEmitter.js