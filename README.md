# Auth-API

## Getting Started

### Requirements

For development, you will only need [Node](http://nodejs.org/) installed in your environment.
Please use the appropriate [Editorconfig](http://editorconfig.org/) plugin for your Editor (not mandatory).

### Install

    git clone git@github.com:Arvoya/auth-api.git
    cd auth-api
    npm install

### Configure app

Any environment configuration steps.

### Start & watch

    npm run dev
    npm start

## Architecture

```text
├── .github
│   ├── workflows
│   │   └── node.yml
├── __tests__
│   ├── auth.test.js (integration test)
│   └── server.test.js
├── src
│   ├── auth
│   │   ├── middleware
│   │   │   ├── acl.js
│   │   │   ├── basic.js
│   │   │   ├── basic.test.js (unit test)
│   │   │   └── bearer.js
│   │   │   ├── bearer.test.js
│   │   ├── models
│   │   │   └── users.js
│   │   └── routes.js
│   ├── error-handlers
│   │   ├── 404.js
│   │   └── 500.js
│   ├── middleware
│   │   └── logger.js
│   ├── models
│   │   ├── clothes
│   │   │   └── model.js
│   │   ├── food
│   │   │   └── model.js
│   │   ├── data-collections.js
│   │   └── index.js
│   ├── routes
│   │   ├── v1.js
│   │   └── v2.js
│   └── server.js
├── .eslintrc.json
├── .gitignore
├── index.js
├── package.json
└── README.md
```

### Languages & tools

* JavaScript
* Node
* Express
* Sqlite3
* Jest
* SuperTest
* Eslint
* Dotenv
* Jsonwebtoken
* Bcrypt
* Base-64
* PG
* Cors
* Nodemon
* Sequelize
* Sequilize-cli

## Change Log

0.0.1 - 2024-04-10

## Collaborators

* Kawika Reveira
* Brock Britton
* Mak Trnka
