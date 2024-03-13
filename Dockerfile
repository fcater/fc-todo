FROM node:21-alpine3.19

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY --chown=app:app package*.json .
RUN npm install
COPY --chown=app:app . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]