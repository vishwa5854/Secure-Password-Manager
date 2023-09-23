FROM node:19

RUN mkdir /src

ADD . /src

WORKDIR /src

RUN npm install

CMD npm start
