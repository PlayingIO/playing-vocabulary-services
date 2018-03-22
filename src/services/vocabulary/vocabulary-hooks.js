import { hooks } from 'mostly-feathers-mongoose';
import { cache } from 'mostly-feathers-cache';

module.exports = function (options = {}) {
  return {
    before: {
      all: [
        cache(options.cache)
      ],
      create: [
        hooks.authenticate('jwt', options.auth)
      ],
      update: [
        hooks.authenticate('jwt', options.auth)
      ],
      patch: [
        hooks.authenticate('jwt', options.auth)
      ],
      remove: [
        hooks.authenticate('jwt', options.auth)
      ]
    },
    after: {
      all: [
        cache(options.cache),
        hooks.responder()
      ]
    }
  };
};