FROM node:14.15.0

COPY . .

RUN npm install && NODE_ENV=production npm run build

EXPOSE 8081
ENV NODE_ENV=production
ENTRYPOINT ["node"]

CMD ["dist/main.js"]
