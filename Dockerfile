FROM node:10.12.0-alpine as builder

RUN mkdir /app
WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.15.8-alpine

COPY --from=builder /app/dist/frontend-angular /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]