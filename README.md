# MORE.Tech 4.0 | Трек 2 - DATA

## Реализация в виде web-сервиса:

В рамках выбранного кейса было реализовано web-приложение. На главной странице имеется окно для выбора файла, который будет анализироваться. ...

## Функциональные возможности:

Реализован анализ файла с данными

## Стек технологий:

* Django
* Tensorflow
* Pandas
* Numpy
* RestAPI
* nltk
* Pillow
* cv2
* sklearn

## Уникальность
...

## Этапы работы приложения
![alt text](https://github.com/xakermonkey/news_vtb/blob/main/app.jpg?raw=true)

## Архитектура предобученной ELMo сети, которая обучена на 5 млн русских слов
![alt text](https://github.com/xakermonkey/news_vtb/blob/main/arch.gif?raw=true)

## Архитектура модели
![alt text](https://github.com/xakermonkey/news_vtb/blob/main/arhp.png?raw=true)

## Точность
![alt text](https://github.com/xakermonkey/news_vtb/blob/main/ex.jpeg?raw=true)

## Кластеризация
![alt text](https://github.com/xakermonkey/news_vtb/blob/main/klast.jpeg?raw=true)

## Docker
1. Склонировать проект на диск
4. Ввести команду `cd ../news_vtb`
5. Ввести команду `docker build -t <package>/<name>`
6. Запустить контейнер `docker run --name <name> -p 8000:8000 -d <package>/<name>`
7. Web-приложение доступно по ссылке `http://127.0.0.1:8000/searcher/main`

## Инструкция по развертыванию
1. Склонировать проект на диск
4. Ввести команду `cd ../news_vtb`
5. Поставить окружение `python3` в папку venv
6. Активировать окружение `source venv/bin/activate` – для Unix; `venv/Scripts/activate.bat` – для Windows
7. Установить зависимости `pip install -r requirements.txt`
8. Запустить `python manage.py runserver`
9. Web-приложение доступно по ссылке `http://127.0.0.1:8000/searcher/main`
