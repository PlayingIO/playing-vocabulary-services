import assert from 'assert';
import makeDebug from 'debug';
import { join } from 'path';
import { plural } from 'pluralize';
import fp from 'ramda';

import defaultHooks from './vocabulary-hooks';

const debug = makeDebug('playing:content-services:path');

const defaultOptions = {
  name: 'paths'
};

// Vocabulary proxy service to fix list of values
class VocabularyService {
  constructor(options) {
    this.options = Object.assign({}, defaultOptions, options);
    this.name = options.name;
    this.options = options;
    this.vocabularies = this.options.vocabularies || {};
  }

  setup(app) {
    this.app = app;
    this.hooks(defaultHooks(this.options));
  }

  find(params) {
    return Promise.resolve(this.vocabularies);
  }

  get(id, params) {
    params = params || { query: {} };
    const name = id;
    const voc = params.__action;
    delete params.__action;

    assert(fp.find(fp.propEq('name', name), this.vocabularies), `vocabulary ${name} not exists`);

    const service = plural(name);
    debug('proxy vocabulary find => ', service);
    return this.app.service(service).find(params);
  }

  create(data, params) {
    assert(data.type, 'data.type not provided');
    assert(fp.find(fp.propEq('name', data.type), this.vocabularies), `vocabulary ${data.type} not exists`);

    const service = plural(data.type);
    debug('proxy vocabulary create => ', service);
    return this.app.service(service).create(data, params);
  }
}

export default function init (app, options, hooks) {
  return new VocabularyService(options);
}

init.Service = VocabularyService;
