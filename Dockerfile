FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Expose port (optional, match $PORT for clarity)
EXPOSE 8080

# Run app with Gunicorn, binding to Render's $PORT
CMD ["sh", "-c", "gunicorn app:app --bind 0.0.0.0:$PORT"]
