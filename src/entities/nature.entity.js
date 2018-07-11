const Entity = require('mostly-entity');

const NatureEntity = new Entity('Nature', {
  type: { default: 'nature' }
});

NatureEntity.discard('createdAt', 'updatedAt', 'destroyedAt');

module.exports = NatureEntity.freeze();
