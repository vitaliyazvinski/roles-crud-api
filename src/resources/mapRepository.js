var MapRepository = function (map) {
  this.map = map;
};

MapRepository.prototype.getAll = function () {
  return [...this.map].map(([key, value]) => ({
    id: key,
    ...value,
  }));
};

MapRepository.prototype.getById = function ({ id }) {
  return this.map.get(id);
};

MapRepository.prototype.insertOrUpdate = function ({ id, data }) {
  this.map.set(id, data);
  return true;
};

MapRepository.prototype.deleteById = function ({ id }) {
  return this.map.delete(id);
};

module.exports = MapRepository;
