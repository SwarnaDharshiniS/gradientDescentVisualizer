const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Experiment = new Schema({
  createdAt: Date,
  params: Schema.Types.Mixed,
  dataset: [Schema.Types.Mixed],
  trace: [Schema.Types.Mixed],
  final: Schema.Types.Mixed
});
module.exports = mongoose.model('Experiment', Experiment);
