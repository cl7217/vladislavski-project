const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../app');
const { connect } = require('../db/mongoClient');

beforeAll(async () => {
  await connect();
});

describe('POST /upload', () => {
  it('should upload a new item and return 201', async () => {
    const res = await request(app)
      .post('/upload')
      .field('itemId', 'test-unique-123')
      .field('name', 'Test File')
      .field('description', 'A file for testing')
      .attach('file', path.join(__dirname, 'fixtures', 'testfile.txt'));

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Item saved');
    expect(res.body).toHaveProperty('id');
  });

  it('should not allow duplicate itemId', async () => {
    const res = await request(app)
      .post('/upload')
      .field('itemId', 'test-unique-123')
      .field('name', 'Duplicate Test')
      .field('description', 'Should fail')
      .attach('file', path.join(__dirname, 'fixtures', 'testfile.txt'));

    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty('message', 'Item already exists');
  });
});
