import { hooks } from 'mostly-feathers-mongoose';

module.exports = function(options = {}) {
  return {
    before: {
      create: [
        hooks.authenticate('jwt', options)
      ],
      update: [
        hooks.authenticate('jwt', options)
      ],
      patch: [
        hooks.authenticate('jwt', options)
      ],
      remove: [
        hooks.authenticate('jwt', options)
      ]
    },
    after: {
      all: [
        hooks.responder()
      ]
    }
  };
};