const factory = require('./handlerFactory');
const Location = require('./../models/locationModel');

exports.getAllLocation = factory.getAll(Location);

exports.getOneLocation = factory.getOne(Location);

exports.patchLocation = factory.updateOne(Location);

exports.createLocation = factory.createOne(Location);

exports.deleteLocation = factory.deleteOne(Location);