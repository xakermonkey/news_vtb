FROM python:3.8.10

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /opt/digit_hack

COPY requirements.txt requirements.txt

RUN set -ex && \
    apt-get update && apt-get -y install nano gcc  &&\
    pip install -r requirements.txt && \
    rm -rf /var/lib/apt/lists/*

COPY . .

RUN chmod ugo+x script.sh

RUN useradd -ms /bin/bash fduser && \
    chown -R fduser /opt/digit_hack
USER fduser

EXPOSE 8000

CMD ["./script.sh"]
