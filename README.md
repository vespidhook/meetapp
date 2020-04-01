# Desafio Meetapp do Bootcamp da Rocketseat

O Meetapp foi desenvolvido no Bootcamp GoStack da Rocketseat usando NodeJS, ReactJS e React Native.

Para execução deste projeto você deve ter instalado em seu computador o NodeJs, Yarn e o Docker com Postgres e o Mongo.


## Instalando o backend

#### Criando container Postgree com o Docker
$ docker run --name database_meetapp -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=database_meetapp -p 5432:5432 -d postgres

#### Crianda o contêiner Mongo com o Docker
$ docker run --name mongo_meetapp -p 27017:27017 -d -t mongo

#### Criada Redis com o Docker
$ docker run --name redis_meetapp -p 6379:6379 -d -t redis:alpine

#### Clone o repositório
$ git clone https://github.com/vespidhook/desafio-meetapp-rocketseat.git

#### Vá para o diretorio 
$ cd meetapp/backend

#### Instalar dependências
$ yarn

#### Executar migrates
No backend executar
$ yarn sequelize db:migrate

#### Executando o backend 
$ yarn dev



## Instalando o frontend

#### Vá para o diretorio 
$ cd meetapp/frontend

#### Instalar dependências
$ yarn

#### Executando frontend
$ yarn start



## Instalando o mobile (testado somente no android)

#### Vá para o diretorio 
$ cd meetapp/mobile

#### Instalar dependências
$ yarn

#### Executando mobile
$ react-native run-android






