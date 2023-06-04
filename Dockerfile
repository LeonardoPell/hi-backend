FROM node:18.16.0

WORKDIR app/

COPY . .
COPY ./.env.production ./.env

run npm install -g dotenv-cli

RUN npm install --quiet --no-optional --no-fund --loglevel=error

RUN npm run build

EXPOSE 8080

CMD ["npm","run","start:prod"]