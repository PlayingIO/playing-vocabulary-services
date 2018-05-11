import { Service, createService } from 'mostly-feathers-mongoose';
import fp from 'mostly-func';

import NatureModel from '../../models/nature.model';
import defaultHooks from './nature.hooks';

const defaultOptions = {
  id: 'id',
  name: 'subjects'
};

export class NatureService extends Service {
  constructor (options) {
    options = fp.assign(defaultOptions, options);
    super(options);
  }

  setup (app) {
    super.setup(app);
    this.hooks(defaultHooks(this.options));
  }
}

export default function init (app, options, hooks) {
  options = { ModelName: 'nature', ...options };
  return createService(app, NatureService, NatureModel, options);
}

init.Service = NatureService;
