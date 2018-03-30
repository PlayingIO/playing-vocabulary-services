import assert from 'assert';
import makeDebug from 'debug';
import fp from 'mostly-func';
import { plural } from 'pluralize';

import defaultHooks from './vocabulary.hooks';

const debug = makeDebug('playing:vocabulary-services:vocabulary');

const defaultOptions = {
  name: 'paths'
};

// Vocabulary proxy service to fix list of values
export class VocabularyService {
  constructor (options) {
    this.options = Object.assign({}, defaultOptions, options);
    this.name = this.options.name;
    this.vocabularies = this.options.vocabularies || {};
  }

  setup (app) {
    this.app = app;
    this.hooks(defaultHooks(this.options));
  }

  find (params) {
    return Promise.resolve(this.vocabularies);
  }

  get (id, params) {
    params = Object.assign({ query: {} }, params);
    let name = id;
    const voc = params.__action;
    delete params.__action;

    if (params.query.name) name = params.query.name;
    assert(fp.find(fp.propEq('name', name), this.vocabularies), `vocabulary ${name} not exists`);

    const service = plural(name);
    debug('proxy vocabulary find => ', service);
    if (voc) {
      return this.app.service(service).get(voc, params);
    } else {
      const label = (params.query.dbl10n === 'true' && params.query.lang)
        ? 'label_' + params.query.lang : 'label';
      if (params.query.term) {
        params.query[label] = params.query.term;
        params.paginate = false;
        params.query = fp.omit(['name', 'dbl10n', 'localize', 'lang', 'term'], params.query);
      }
      params.query.$sort = params.query.$sort || { parent: 1, position: 1 };
      return this.app.service(service).find(params).then(results => {
        return fp.map(entry => {
          entry.dbl10n = params.query.dbl10n === true;
          entry.displayLabel = entry[label];  // i10n
          return entry;
        }, results && results.data || results || []);
      });
    }
  }

  create (data, params) {
    assert(data.type, 'data.type not provided');
    assert(fp.find(fp.propEq('name', data.type), this.vocabularies), `vocabulary ${data.type} not exists`);

    const service = plural(data.type);
    debug('proxy vocabulary create => ', service);
    return this.app.service(service).create(data, params);
  }

  update (id, data, params) {
    assert(data.type, 'data.type not provided');
    assert(fp.find(fp.propEq('name', data.type), this.vocabularies), `vocabulary ${data.type} not exists`);

    const service = plural(data.type);
    debug('proxy vocabulary update => ', service);
    return this.app.service(service).update(id, data, params);
  }

  patch (id, data, params) {
    assert(data.type, 'data.type not provided');
    assert(fp.find(fp.propEq('name', data.type), this.vocabularies), `vocabulary ${data.type} not exists`);

    const service = plural(data.type);
    debug('proxy vocabulary patch => ', service);
    return this.app.service(service).patch(id, data, params);
  }

  remove (id, params) {
    params = fp.assign({ query: {} }, params);
    const type = id;
    const voc = params.__action;
    delete params.__action;
    params.query.$soft  = params.query.$soft || true;
    
    assert(voc, 'vocabulary id not provided');
    assert(fp.find(fp.propEq('name', type), this.vocabularies), `vocabulary ${type} not exists`);

    const service = plural(type);
    debug('proxy vocabulary remove => ', service);
    return this.app.service(service).remove(voc, params);
  }
}

export default function init (app, options, hooks) {
  return new VocabularyService(options);
}

init.Service = VocabularyService;
