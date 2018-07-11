const { Service, createService } = require('mostly-feathers-mongoose');
const fp = require('mostly-func');

const SubjectModel = require('../../models/subject.model');
const defaultHooks = require('./subject.hooks');

const defaultOptions = {
  id: 'id',
  name: 'subjects'
};

class SubjectService extends Service {
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
  options = { ModelName: 'subject', ...options };
  return createService(app, SubjectService, SubjectModel, options);
};
module.exports.Service = SubjectService;
