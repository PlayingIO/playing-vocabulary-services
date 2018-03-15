import { hooks } from 'mostly-feathers-mongoose';
import NatureEntity from '~/entities/nature-entity';

module.exports = function(options = {}) {
  return {
    before: {
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
        hooks.presentEntity(NatureEntity, options),
        hooks.responder()
      ]
    }
  };
};