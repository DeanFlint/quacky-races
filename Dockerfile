FROM node:12.13.0
WORKDIR /quacky-races 
COPY . .
RUN npm install
EXPOSE 3000

ENV PORT 3000

ENTRYPOINT  ["node","app.js"] 
