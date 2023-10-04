FROM node:18
WORKDIR /var/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3030
CMD ["npm", "start", "prod"]