import { hooks } from 'mostly-feathers-mongoose';

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
        hooks.responder()
      ]
    }
  };
};