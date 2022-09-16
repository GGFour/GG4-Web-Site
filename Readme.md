# GG4 Web Site

This is an e-commerce web application developed by 5 engineering students as the final project of 1st year studies. Our goals were implementing back-end functionality with front-end to create a simple ecommerce website for microtransactions (change internal currency for game items) and to host simple open-source browser games aswell.

## How does it looks like:

![front-end](md-assets/responsiveness.png)

You can visit our website by url: https://gg4-website.herokuapp.com/

Following features were implemented:

* Fetching items from data base
* New user registration, signing in
* Purchasing items from shop (user is given 100 coins when registered)
* Viewing bought items
* Running some static web games

## How to run:

1. Execute `npm install` to install all dependencies.

2. Create copy of `.env.example` file and name it `.env` set your own values for variables.

3. We used docker to run the instance of postgre database, but you can use your own postgre with pre-init dump of the database.

4. For docker:
   1. Install docker
   2. execute `docker-compose -f .\postgre-docker-compose.yaml up` to run the database
   3. execute `docker-compose -f .\postgre-docker-compose.yaml down` to stop the database. (add `-v` flag to remove the data generated during application work)

5. Execute `npm start` to run an application

Credits: Rexol, MohHajri, Pochapali, ni9iri, TheZukab
