## API Rest - TucanTeach - V1.0

[![Latest Stable Version](http://poser.pugx.org/mouf/nodejs-installer/v)](https://packagist.org/packages/mouf/nodejs-installer)
[![Total Downloads](http://poser.pugx.org/mouf/nodejs-installer/downloads)](https://packagist.org/packages/mouf/nodejs-installer)
[![Latest Unstable Version](http://poser.pugx.org/mouf/nodejs-installer/v/unstable)](https://packagist.org/packages/mouf/nodejs-installer)
[![License](http://poser.pugx.org/mouf/nodejs-installer/license)](https://packagist.org/packages/mouf/nodejs-installer)

### INTRODUCCIÓN

ApiRest desarrollada para el comsumo front-end de la aplicación TucanTeach

### REQUERIMIENTOS

🛑 Docker 
🛑 NodeJs >= 14.0

<hr>

### INSTALACIÓN

Escoger un direcctorio y correr el siguiente comando para descargar todo el proyecto 
git clone https://github.com/tavopaz12/API_V1_Tucanteach.git

<br>

Descargar las dependencias necesarias
Npm installl OR Npm i

<br>

Levantar nuestros contonedores con docker compose 
Docker-compose up

<br>

Posteriormente corremos nuestras migraciones 
npm run migrations:run

<hr>

### RUTAS

localhost:3000/api/v1/users (POST , GET , PATCH , DELETE)
localhost:3000/auth/login
localhost:3000/auth/recovery
localhost:3000/auth/change-password
