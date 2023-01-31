## API Rest - TucanTeach - V1.0
[![Latest Stable Version](http://poser.pugx.org/mouf/nodejs-installer/v)](https://packagist.org/packages/mouf/nodejs-installer) 
[![Total Downloads](http://poser.pugx.org/mouf/nodejs-installer/downloads)](https://packagist.org/packages/mouf/nodejs-installer) 
[![Latest Unstable Version](http://poser.pugx.org/mouf/nodejs-installer/v/unstable)](https://packagist.org/packages/mouf/nodejs-installer) 
[![License](http://poser.pugx.org/mouf/nodejs-installer/license)](https://packagist.org/packages/mouf/nodejs-installer) 

### INTRODUCCIÓN

ApiRest desarrollada para el comsumo front-end de la aplicación TucanTeach

### REQUERIMIENTOS

🛑 Docker <br>
🛑 NodeJs >= 14.0

<hr>

### INSTALACIÓN

Escoger un direcctorio y correr el siguiente comando para descargar todo el proyecto <br>
<code>git clone https://github.com/tavopaz12/API_V1_Tucanteach.git</code>

<br>

Descargar las dependencias necesarias
<code>Npm installl</code> OR <code>Npm i</code>

<br>

Levantar nuestros contonedores con docker compose <br>
<code>Docker-compose up</code>

<br>

Posteriormente corremos nuestras migraciones <br>
<code>npm run migrations:run</code>

<hr>

### RUTAS

<code>localhost:3000/api/v1/users (POST , GET , PATCH , DELETE)</code><br>
<code>localhost:3000/auth/login</code><br>
<code>localhost:3000/auth/recovery</code><br>
<code>localhost:3000/auth/change-password</code><br>


