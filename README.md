# MORE.Tech 4.0 | Трек 2 - DATA

## Функциональные возможности:
- Web-приложение
- Реализация с помощью RSS-потока
- Возможность использования в реальном времени
- Ранжирование кластеров по релевантности
- Наличие API
- Простая интеграция в систему
- Масштабируемость

## Предобработка данных
- Парсинг основных новостных сайтов с помощью RSS-потоков
- Обработка полученных данных с помощью nltk
- Форматирование информации

## Стек технологий:

* django
* numpy
* pymorphy2
* tensorflow
* feedparser
* allennlp (ELMo)
* django rest_framework
* natasha
* nltk
* scikit-learn
* torch


## Уникальность
Работа в режиме реального времени

## Этапы работы приложения
* Парсинг сайтов с помощью RSS-потоков
* Классификация новостной ленты по ролям с возможностью масштабирования
* Объединение новостей внутри классов в кластеры
* Ранжирование объектов / Выявление трендов и инсайдов

![alt text](https://github.com/xakermonkey/news_vtb/blob/main/app.jpg?raw=true)

## Парсинг новостей 
Для получение статей с новостных источников мы воспользовались RSS-потоками, которые предоставляют сами порталы, 
для быстрой и удобной работы с их статьями. Нами была создана база данных с 36 источниками новостей, которые предоставили RSS-потоки, что позволило нам практически в реальном времени обновлять новостную 
ленту нашего сайта. Так же в баже данных было предусмотрено поле, для отнесения тех или иных источников новостей к запрещенным на территории РФ
## Классификация новостей по ролям
Для решения данной задачи мы нашли набор новостей lenta.ru, rt.ru, ria.ru, 
который составлял около 900 000 записей отсортировали его по категориям и разметили 
около 1500 данных.
Для кодирования слов числовым вектором мы использовали предобученную модель ELMo.
Для самое же классификации мы построили и обучили рекурентную нейронную сеть, которая предсказывала роли для новостей
### Архитектура ELMo сети, которая обучена на 5 млн русских слов
![alt text](https://github.com/xakermonkey/news_vtb/blob/main/arch.gif?raw=true)

## Архитектура веб-сервиса
![alt text](https://github.com/xakermonkey/news_vtb/blob/main/arhp.png?raw=true)

## Точность
![alt text](https://github.com/xakermonkey/news_vtb/blob/main/ex.jpeg?raw=true)

## Кластеризация
- Для кластеризации используется алгоритм kMeans
- Использование метрики силуэта для поиска наилучшего количества кластеров
- Кластеризация происходит по заголовкам статей
![alt text](https://github.com/xakermonkey/news_vtb/blob/main/klast.jpeg?raw=true)


## Ранжирование
Для ранжирования используется авторитет новостного источника и близость конкретной новости к тренду
![alt text](https://github.com/xakermonkey/news_vtb/blob/main/ranzh.jpg?raw=true)

## Тренды и инсайды
- Поиск трендов осуществляется на основе повторений ключевых слов новости за фиксированный промежуток времени
- Поиск ключевых слов происходит с помощью модели ML natasha
- Инсайды прогнозируются на основе последовательностей ключевых слов в истории

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
