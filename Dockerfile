FROM node:22 AS build

WORKDIR /build

COPY frontend/package*.json .
COPY frontend/tsconfig*.json .
COPY frontend/index.html .
COPY frontend/vite.config.ts .
COPY frontend/src ./src
COPY frontend/public ./public
COPY frontend.env .env

RUN npm ci

ENV NODE_ENV=production
RUN npm run build





FROM python:3.12.10-bookworm

WORKDIR /home/server
ENV PYTHONUTF8=1

COPY backend .
COPY --from=build /build/dist ./app
COPY backend.env .env

RUN pip install -r requirements.txt



EXPOSE 80
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]