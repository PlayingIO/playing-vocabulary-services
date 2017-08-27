import { hooks as auth } from 'feathers-authentication';
import { hooks } from 'mostly-feathers-mongoose';

module.exports = function(options = {}) {
  return {
    before: {
      create: [
        auth.authenticate('jwt')
      ],
      update: [
        auth.authenticate('jwt')
      ],
      patch: [
        auth.authenticate('jwt')
      ],
      remove: [
        auth.authenticate('jwt')
      ]
    },
    after: {
      all: [
        hooks.responder()
      ]
    }
  };
};