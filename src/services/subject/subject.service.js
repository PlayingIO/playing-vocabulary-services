import { Service, createService } from 'mostly-feathers-mongoose';
import fp from 'mostly-func';

import SubjectModel from '../../models/subject.model';
import defaultHooks from './subject.hooks';

const defaultOptions = {
  id: 'id',
  name: 'subjects'
};

export class SubjectService extends Service {
  constructor (options) {
    options = fp.assignAll(defaultOptions, options);
    super(options);
  }

  setup (app) {
    super.setup(app);
    this.hooks(defaultHooks(this.options));
  }
}

export default function init (app, options, hooks) {
  options = { ModelName: 'subject', ...options };
  return createService(app, SubjectService, SubjectModel, options);
}

init.Service = SubjectService;
