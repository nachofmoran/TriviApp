FROM node:18.16-alpine3.16 as builder
RUN mkdir /lit-app
WORKDIR /lit-app
COPY . .
RUN npm ci
RUN npm run build -- --output-path=dist

FROM nginx:1.13.3-alpine
COPY nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /lit-app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]