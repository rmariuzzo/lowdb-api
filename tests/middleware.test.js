const fs = require('fs')
const tmp = require('tmp')
const path = require('path')
const express = require('express')
const request = require('supertest')
const bodyParser = require('body-parser')
const lowdbMiddleware = require('../index')

const source = path.join(__dirname, './fixtures/db.json')

describe('lowdb api middleware', () => {

  let server

  beforeAll(() => {
    const file = tmp.fileSync()
    fs.createReadStream(source).pipe(fs.createWriteStream(file.name))
    server = createServer(file.name)
  })

  it('should get all resources', (done) => {
    request(server)
      .get('/users')
      .expect(200)
      .then((res) => expect(res.body).toHaveLength(2))
      .then(done)
  })

  it('should get a specific resource', (done) => {
    request(server)
      .get('/users/1')
      .expect(200)
      .then((res) => expect(res.body).toHaveProperty('id', 1))
      .then(done)
  })

  it('should insert a new resource', (done) => {
    request(server)
      .post('/users')
      .send({ name: 'test' })
      .expect(201)
      .then((res) => expect(res.body).toHaveProperty('name', 'test'))
      .then(done)
  })

  it('should insert a new resource with a given id', (done) => {
    request(server)
      .post('/users')
      .send({ id: 50, name: 'test' })
      .expect(201)
      .then((res) => expect(res.body).toHaveProperty('id', 50))
      .then(done)
  })

  it('should update an existing resource', (done) => {
    request(server)
      .put('/users/1')
      .send({ name: 'test' })
      .expect(200)
      .then((res) => expect(res.body).toHaveProperty('name', 'test'))
      .then(done)
  })

  it('should remove an existing resource', (done) => {
    request(server)
      .delete('/users/1')
      .expect(200)
      .then((res) => expect(res.body).toHaveProperty('name', 'test'))
      .then(() => {
        request(server)
          .delete('/users/1')
          .then((res) => expect(res.status).toBe(404))
          .then(done)
      })
  })

})

function createServer (file, options) {
  const server = express()
  server.use(bodyParser.json())
  server.use((req, res, next) => {
    try {
      lowdbMiddleware(file)(req, res, next)
    } catch (err) {
      fail(err)
      next()
    }
  })
  return server
}
