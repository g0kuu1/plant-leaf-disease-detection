FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Don’t hardcode port – Render provides $PORT
CMD gunicorn app:app --bind 0.0.0.0:$PORT
