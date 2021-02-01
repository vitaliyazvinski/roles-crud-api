var model = {
  getById: jest.fn(),
  getAll: jest.fn(),
  insertOrUpdate: jest.fn(),
  deleteById: jest.fn(),
};

var statusChain = {
  send: jest.fn(),
  json: jest.fn(),
};
var res = {
  status: jest.fn(() => statusChain),
};

const crudMiddleware = require('../crud')(model);

beforeEach(() => jest.clearAllMocks());

test('it can get one item from model', () => {
  var req = { params: { id: '0' } };
  model.getById.mockReturnValueOnce(null);

  crudMiddleware.getOne(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.status().send).toHaveBeenCalledTimes(1);

  jest.clearAllMocks();
  var result = 'not null';
  model.getById.mockReturnValueOnce(result);
  crudMiddleware.getOne(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.status().json).toHaveBeenCalledWith(result);
  expect(res.status().json).toHaveBeenCalledTimes(1);
});

test('it can get all items from model', () => {
  var result = [];
  model.getAll.mockReturnValueOnce(result);
  crudMiddleware.getAll(null, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.status().json).toHaveBeenCalledWith(result);
  expect(res.status().json).toHaveBeenCalledTimes(1);
});

test('it can create new item in model or update existing one', () => {
  var req = { body: { noIdFieldInBody: {} } };

  crudMiddleware.createOrUpdate(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.status().send).toHaveBeenCalledTimes(1);

  jest.clearAllMocks();
  var req = { body: { id: '0', field1: '', field2: '' } };

  crudMiddleware.createOrUpdate(req, res);

  var { id, ...data } = req.body;
  expect(model.insertOrUpdate).toHaveBeenCalledWith({ id, data: data });
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.status().send).toHaveBeenCalledTimes(1);
});

test('it can delete item from model', () => {
  var req = { params: { id: '0' } };

  model.deleteById.mockReturnValueOnce(false);
  crudMiddleware.deleteById(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.status().send).toHaveBeenCalledTimes(1);

  jest.clearAllMocks();
  model.deleteById.mockReturnValueOnce(true);
  crudMiddleware.deleteById(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.status().send).toHaveBeenCalledTimes(1);
});
