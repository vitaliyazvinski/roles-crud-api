const authMiddleware = require('../auth');
const auth = require('../../auth');

jest.mock('../../auth');

var requestWithoutAuthHeader = {
  headers: {},
};

var requestWithAuthHeader = {
  headers: { authorization: 'Beaver token' },
};

var res = {
  sendStatus: jest.fn(),
};
var next = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('it can ensure user is authenticated', () => {
  test('it sends 401 if auth header is not provided', () => {
    authMiddleware.ensureAuthenticated(requestWithoutAuthHeader, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
  });

  test('it sends 403 if token is broken', () => {
    auth.verifyToken.mockImplementation((_, cb) => cb('error has happened'));

    authMiddleware.ensureAuthenticated(requestWithAuthHeader, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(403);
  });

  test('it sets user and calls next if token is correct', () => {
    var user = { name: "I'm user" };
    auth.verifyToken.mockImplementation((_, cb) => cb(null, user));

    authMiddleware.ensureAuthenticated(requestWithAuthHeader, res, next);

    expect(requestWithAuthHeader.user).toEqual(user);
    expect(next).toHaveBeenCalled();
  });
});

test('it ensures owner is authenticated', () => {
  var req = { user: { role: 'owner' } };
  var req2 = { user: { role: 'notOwner' } };

  authMiddleware.ensureOwnerAuthorizated(req, res, next);
  expect(next).toHaveBeenCalled();

  authMiddleware.ensureOwnerAuthorizated(req2, res, next);
  expect(res.sendStatus).toHaveBeenCalledWith(403);
});
