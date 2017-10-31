<div align=center>
<h1>lowdb api</h1>
<p>A small middleware to interact with <a href="https://github.com/typicode/lowdb">lowdb</a> via a RESTful API</p>
</div>

### Motivation

During initial development process, I usually want to interact with an API, but I don't want to spend time writing one. I was looking for a **catch-all RESTful endpoint** where I could do commons [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). Unfortunately, I haven't found it... therefore, I created: [lowdb-api](https://github.com/rmariuzzo/lowdb-api).

## Installation

```
npm install lowdb-api
```

### Usage with Express

```js
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const lowdbApi = require('lowdb-api')

const app = express()
const file = path(__dirname, './db.json') 

app.use(bodyParser.json())
app.use(lowdbApi(file))
```
## Development

 1. `yarn`
 2. `yarn test` or `yarn test -- --watch`

