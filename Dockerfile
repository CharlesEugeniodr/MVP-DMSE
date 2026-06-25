FROM python:3.10-slim

WORKDIR /app

# Instalação de utilitários básicos e limpeza de cache apt
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Instalação das dependências Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Cópia de todo o código fonte para a imagem
COPY . .

# Exposição das portas padrões dos serviços
EXPOSE 8000
EXPOSE 8501
