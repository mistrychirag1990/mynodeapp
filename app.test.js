const request = require('supertest');
const express = require('express');

// import your app logic (we slightly modify app.js later)

const app = require('./app');

test('GET / should return message', async () => {
  const res = await request(app).get('/');
  expect(res.text).toBe("Node + PostgreSQL App 🚀");
});
