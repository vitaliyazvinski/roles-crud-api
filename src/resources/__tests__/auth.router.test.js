const axios = require('axios');
const { startServer } = require('../../server');
const baseURL = 'http://localhost:8001/auth';
const api = axios.create({ baseURL });

var server;

// Here any tool might be used to generate some test data in the db;
// I'm just using those which were hardcoded as default ones in dummy model
// In a similar way any other endpoint might be tested
beforeAll(async () => {
  server = await startServer(8001);
});

afterAll(() => server.close());

test('it provides /login endpoint', async () => {
  const result = await api.post('/login', {
    username: 'Adam',
    password: 'secureOwnerPassword',
  });
  expect(result.data).toEqual({
    authToken: expect.any(String),
  });
});
