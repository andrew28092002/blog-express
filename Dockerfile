FROM node:alpine
RUN mkdir -p usr/app
WORKDIR /usr/app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build
EXPOSE 8000
CMD ["node", "dist/src/index.js"]