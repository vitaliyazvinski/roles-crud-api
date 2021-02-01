const auth = require('../auth');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

test('it can verify token', () => {
  jwt.verify.mockReturnValue('secret');

  var result = auth.verifyToken('', () => {});

  expect(result).toBe('secret');
  expect(jwt.verify.mock.calls.length).toBe(1);
});

test('it can sign token', () => {
  jwt.sign.mockReturnValue('signedSecret');

  var result = auth.getSignedToken('', () => {});

  expect(result).toBe('signedSecret');
  expect(jwt.sign.mock.calls.length).toBe(1);
});
