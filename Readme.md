# GG4 Web Site

Our gaming related e-commerce shop.

## How to use

Firstly, you need to create a `.env` file and fill it in with your data according to `.env.example`.

Execute `npm install` to get required packages.

We used docker to run our database, so to be able to use database you need to install docker and execute the following command to run the database:

`docker-compose -f mysql-docker-compose.yaml up`

and to stop the database:

`docker-compose -f mysql-docker-compose.yaml down`

Another option is to install mysql on your local machine and configure it according to .env file.

Run application with `npm start` and use it at `localhos: port`