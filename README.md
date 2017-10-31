<div align=center>
<h1>lowdb api</h1>
<p><a href="https://github.com/rmariuzzo/lowdb-api"><strong>lowdb-api</strong></a> is an <a href="http://expressjs.com/en/guide/using-middleware.html">Express middleware</a> that interpret all requests as a real RESTful API.</p>
</div>

## Features

 - Support common http methods (get, post, put and delete).
 - Custom API prefix.
 - Relies on [lowdb](https://github.com/typicode/lowdb).
 - Accept custom [lowdb adapter](https://github.com/typicode/lowdb#adapters-api).

## Motivation

> During initial development process, I usually want to interact with an API, but I don't want to spend time writing one. I was looking for a **catch-all RESTful endpoint** where I could do commons [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). Unfortunately, I haven't found it... therefore, I created: [lowdb-api](https://github.com/rmariuzzo/lowdb-api).

## Installation

```
npm install lowdb-api
```

### Configuration

```js
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const lowdbApi = require('lowdb-api')

const app = express()
const file = path.join(__dirname, './db.json')
const options = {}

app.use(bodyParser.json())
app.use(lowdbApi(file, options))
```

#### Options

 - `prefix` - (string, default: null) specify the prefix if you want to mount lowdb-api under a path (example: /api/v1)
 - `adapter` - (string, default: lowdb/adapters/FileSync) a [lowdb adapter](https://github.com/typicode/lowdb#adapters-api).

### Usage

For the aforementioned configuration the following paths will be interpreted:

 - `GET: /resources` - list all resources.
 - `GET: /resources/:id` - get a resource by its id.
 - `POST: /resources` - create a new resource in the list.
 - `PUT: /resources/:id` - update an existing resource.
 - `DELETE: /resources/:id` - delete an existing resource.

## Issues

If you spot a bug please [create an issue](https://github.com/rmariuzzo/lowdb-api/issues/new).

## Development

 1. `yarn`
 2. `yarn test` or `yarn test -- --watch`

