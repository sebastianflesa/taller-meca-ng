FROM node:18.19 AS dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install
FROM node:18.19 AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
FROM nginx:1.23.3 as prod
EXPOSE 80
COPY --from=builder /app/dist/taller-meca-ng/browser /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]