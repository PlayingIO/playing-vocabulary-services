const { hooks } = require('mostly-feathers-mongoose');
const { cache } = require('mostly-feathers-cache');

const NatureEntity = require('../../entities/nature.entity');

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
        hooks.presentEntity(NatureEntity, options.entities),
        hooks.responder()
      ]
    }
  };
};