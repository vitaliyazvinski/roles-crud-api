function crudMiddleware(model) {
  return {
    getOne(req, res) {
      var id = req.params.id;
      var result = model.getById({ id });
      return result == null
        ? res.status(404).send()
        : res.status(200).json(result);
    },
    getAll(_, res) {
      var result = model.getAll();
      return res.status(200).json(result);
    },
    createOrUpdate(req, res) {
      var { id, ...data } = req.body;
      if (id == null) return res.status(400).send();
      model.insertOrUpdate({ id, data });
      res.status(200).send();
    },
    deleteById(req, res) {
      var id = req.params.id;
      var result = model.deleteById({ id });
      return result ? res.status(200).send() : res.status(404).send();
    },
  };
}

module.exports = crudMiddleware;
