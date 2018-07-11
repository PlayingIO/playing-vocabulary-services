const { Service, createService } = require('mostly-feathers-mongoose');
const fp = require('mostly-func');

const NatureModel = require('../../models/nature.model');
const defaultHooks = require('./nature.hooks');

const defaultOptions = {
  id: 'id',
  name: 'subjects'
};

class NatureService extends Service {
  constructor (options) {
    options = fp.assignAll(defaultOptions, options);
    super(options);
  }

  setup (app) {
    super.setup(app);
    this.hooks(defaultHooks(this.options));
  }
}

module.exports = function init (app, options, hooks) {
  options = { ModelName: 'nature', ...options };
  return createService(app, NatureService, NatureModel, options);
};
module.exports.Service = NatureService;
