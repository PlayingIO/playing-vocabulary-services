import Entity from 'mostly-entity';

const SubjectEntity = new Entity('Subject', {
  type: { default: 'subject' }
});

SubjectEntity.excepts('createdAt', 'updatedAt', 'destroyedAt');

export default SubjectEntity.asImmutable();
