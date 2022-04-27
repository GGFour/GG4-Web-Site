# GG4 Web Site

This is a project developed by 5 engineering students. Our goals were implementing back-end functionality with front-end to create a simple ecommerce website and to host simple open-source browser games aswell.

## How to run:

1. Execute `npm install` to install all dependencies.

2. Create copy of `.env.example` file and name it `.env` set your own values for variables.

3. We used docker to run the instance of postgre database, but you can use your own postgre with pre-init dump of the database.

4. For docker:
   1. Install docker
   2. execute `docker-compose -f .\postgre-docker-compose.yaml up` to run the database
   3. execute `docker-compose -f .\postgre-docker-compose.yaml down` to stop the database. (add `-v` flag to remove the data generated during application work)

5. Execute `npm start` to run an application

GNU AFFERO GENERAL PUBLIC LICENSE
Credits: Rexol, MohHajri, Pochapali, ni9iri, TheZukab