# Auth-API

## Getting Started

### Requirements

For development, you will only need [Node](http://nodejs.org/) installed in your
environment.
Please use the appropriate [Editorconfig](http://editorconfig.org/) plugin for your
Editor (not mandatory).

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
├── LICENSE
├── __tests__
│   ├── auth.test.js
│   └── server.test.js
└── src
    ├── auth
    │   ├── middleware
    │   │   ├── acl.js
    │   │   ├── basic.js
    │   │   ├── basic.test.js
    │   │   ├── bearer.js
    │   │   └── bearer.test.js
    │   ├── models
    │   │   ├── index.js
    │   │   └── users.js
    │   └── routes.js
    ├── error-handlers
    │   ├── 404.js
    │   └── 500.js
    ├── middleware
    │   └── logger.js
    ├── models
    │   ├── appointments
    │   │   └── appointment.js
    │   ├── concerns
    │   │   └── model.js
    │   ├── data-collections.js
    │   ├── index.js
    │   └── recs
    │       └── model.js
    ├── routes
    │   └── v2.js
    └── server.js
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

### 0.0.2 - 2024-04-11

**Collaborators:**

* Brock Britton

### 0.0.1 - 2024-04-10

**Collaborators:**

* Kawika Reveira
* Brock Britton
* Mak Trnka
