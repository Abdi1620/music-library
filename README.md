# EXPRESS-MUSIC_LIBRARY SUMMARY

# Description

This is a express backend application that creates Artists and Albums , updates and deletes. It works intergrated with `docker` with `PostgresSQL` database server.

# DEPENDENCY INSTALLATION AFTER CLONE

1. Install dependencies

js
npm install


2. If you have `docker` installed on your computer run the following
   command in your `terminal`, otherwise install docker and run command.

js
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres


This will pull and run a postgres image

3. If you have `pgAdmin4` installed on your computer
   Add a new server with the follewing details

js
hostname: localhost;
username: postgres;
password: password;


4. Run tests with `npm test`
5. Start serving with `npm serve`

# Project Setup when recreating

1. Create repository on github music-library

2. Create a directory in your projects folder called music library

3. Initialize a git repo with `git init`

4. Connect your project to your github repo

5. Initialize a node project in your folder with `npm init -y`.
   This will create a default `package.json`

6. Create a `.gitignore` file. You can do this automatically with `npx gitignore` node.
   This will create a new file filled with common `.gitignore` entries.

7. Set up `eslint` in this project with `npx eslint --init`.
   The resulting eslintrc.json should look like this.

json
{
  "env": {
    "commonjs": true,
    "es6": true,
    "node": true,
    "mocha": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {}
}


8. Open you project folder in your `code editor` and create a new file called
   prettierrc.json to have the following

json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}


9. Install express as a dependency

js
npm i -S express


10. Make a folder in root called `src` and a file named `app.js` within it.

11. Put this in `app.js`.

js
// './src/app.js'
const express = require('express');

const app = express();

app.use(express.json());

// Add a route to application as follows

app.get('/', (req, res) => {
  res.status(200).send('Hello world');
});

module.exports = app;


12. Create a file in your root folder called `index.js`
    Should look like this

js
// index.js
const app = require('./src/app.js');

const APP_PORT = 4000;

app.listen(APP_PORT, () => {
  console.log(`App is listening on port ${APP_PORT}`);
});


This will be serving our express app on port `4000` when node index.js is run

### SETTING UP THE DATABASE

13. Install `dotenv` as a dev dependency. dotenv is a package which lets us
    load environment variables from a file

js
npm i -D dotenv


### ENV AND TEST ENV

14. Make two files `.env` and `.env.test`
    Add this to your `.env`

js
PGUSER = postgres;
PGHOST = localhost;
PGPASSWORD = password;
PGDATABASE = music_library_dev;
PGPORT = 5432;
PORT = 3000;


15. Copy the same to your `.env.test` but change database to

js
PGDATABASE = music_library_test;


16. Change `APP_PORT` in `index.js` to the following.

js
 // index.js
 ...
 const APP_PORT = process.env.PORT || 4000;
 ...


Now running your application should open port `3000` confirming that your env is working

17. Add `.env.test` to your .gitignore file

`Happy hacking....`