How to run the project

step 1: Create database and import dynamic_form.sql file to the database

```
psql> create database dynamic_form;
```

```
$ psql -f dynamic_form.sql -h 0.0.0.0 -U <username> <database_name>

```

step 2: Go to backend folder in your terminal and follow these steps

```
$ cd backend

backend$ npm install
```

create .env file and copy all the values from .env.example to .env file

```
backend$ cp .env.example .env
```

do not forget to all values, here are some example values

```
PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dynamic_form
DB_USER=vinay
DB_PASS=123
```

Now start the backend

```
backend$ npm start
```

step 3: Go to frontend folder in your terminal and follow these steps

```
backend$ cd ../frontend

frontend$ npm install

frontend$ npm start
```

If everything gose well, application must be running.

In case if you face database error/issue with uuid, then you must try to enable uuid-ossp extension for generating uuid in database

```
psql> CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

You might need to create a role name "vinay" in database

```
psql> create role vinay with LOGIN;

psql> alter role vinay with SUPERUSER;
```

If you want to change password of role that you have created

```
psql> \password vinsy
```
