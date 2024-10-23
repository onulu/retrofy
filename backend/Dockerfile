FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt ./

RUN pip3 install --no-cache-dir --upgrade -r ./requirements.txt

COPY ./app ./app

EXPOSE 80

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80", "--reload"]
