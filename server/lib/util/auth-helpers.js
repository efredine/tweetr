const ObjectId = require('mongodb').ObjectID;

module.exports = {
  ifValidId: (req, res, next) => {
    try {
      req.params.objectId = new ObjectId(req.params.id);
      next();
    } catch (err) {
      console.log(err);
      res.statusCode(404).send();
    }
  }
};