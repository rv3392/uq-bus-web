FROM node:14

LABEL maintainer="richal.verma@uq.net.au"

WORKDIR /usr/src/app
COPY my-app/ ./my-app/
RUN cd my-app && npm install && npm run build
RUN