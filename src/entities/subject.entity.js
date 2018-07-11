const Entity = require('mostly-entity');

const SubjectEntity = new Entity('Subject', {
  type: { default: 'subject' }
});

SubjectEntity.discard('createdAt', 'updatedAt', 'destroyedAt');

module.exports = SubjectEntity.freeze();
