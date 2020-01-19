FROM node:13.1.0-alpine AS build

WORKDIR /src
COPY ./package.json ./package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.17.7-alpine
COPY --from=build /src/build/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
