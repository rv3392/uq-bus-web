FROM node:14

LABEL maintainer="richal.verma@uq.net.au"

WORKDIR /usr/src/app
COPY ./src ./uq-bus-web/src
COPY ./public ./uq-bus-web/public
COPY ./package.json ./uq-bus-web/
RUN cd uq-bus-web && npm install && npm install serve -g && npm run build
WORKDIR /usr/src/app/uq-bus-web/

ENTRYPOINT [ "serve", "-s", "build", "-l", "80" ]