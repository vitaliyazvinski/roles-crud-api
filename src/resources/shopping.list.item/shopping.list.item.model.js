const MapRepository = require('../mapRepository');
const repository = new MapRepository(
  new Map([
    ['0', { name: 'Bread', count: 1 }],
    ['1', { name: 'Milk', count: 1 }],
  ])
);

module.exports = repository;
