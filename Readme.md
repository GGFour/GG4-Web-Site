# GG4 Web Site

## How to run:

1. Execute `npm install` to install all dependencies.

2. Create copy of `.env.example` file and name it `.env` set your own values for variables.

3. We used docker to run the instance of mysql database, but you can use your own mysql with pre-init dump of the database.

4. For docker:
   1. Install docker
   2. execute `docker-compose -f .\postgre-docker-compose.yaml up` to run the database
   3. execute `docker-compose -f .\postgre-docker-compose.yaml down` to stop the database. (add `-v` flag to remove the data generated during application work)

5. Execute `npm start` to run an application
