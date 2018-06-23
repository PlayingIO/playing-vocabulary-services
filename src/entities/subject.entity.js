import Entity from 'mostly-entity';

const SubjectEntity = new Entity('Subject', {
  type: { default: 'subject' }
});

SubjectEntity.discard('createdAt', 'updatedAt', 'destroyedAt');

export default SubjectEntity.freeze();
