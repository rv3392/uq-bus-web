FROM node:14 as node
LABEL maintainer="richal.verma@uq.net.au"
WORKDIR /usr/src/app
COPY ./src ./uq-bus-web/src
COPY ./public ./uq-bus-web/public
COPY ./package.json ./uq-bus-web/
RUN cd uq-bus-web && yarn install && yarn build
WORKDIR /usr/src/app/uq-bus-web/

FROM nginx:alpine
LABEL maintainer="richal.verma@uq.net.au"
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=node /usr/src/app/uq-bus-web/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]